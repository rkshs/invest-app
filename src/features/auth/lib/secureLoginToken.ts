import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { AUTH_API_MODE } from '../config';
import { LocalAuthenticationErrorCode } from './biometricAuth';

/**
 * Хранилище loginToken для входа по биометрии (docs/SECURITY.md, MASVS-STORAGE).
 *
 * Токен, используемый для биометрического входа/подтверждения второго
 * фактора, кладётся в SecureStore с requireAuthentication: true — привязка
 * к биометрии выполняется на уровне ОС (Keychain/Keystore), а не флажком
 * biometricEnabled в коде. В demo-режиме и на web этот модуль — no-op,
 * demo продолжает работать через AuthFlowContext/demoAuthStore как раньше.
 *
 * ВАЖНО: реальный apiAuthService пока не подключён (см. src/features/auth/api/api/apiAuthService.ts).
 * Когда он появится, полученный ниже token нужно будет передавать на backend
 * вместе с identifierValue для серверной валидации быстрого входа.
 */

const TOKEN_KEY = 'auth_biometric_login_token';
const MARKER_KEY = 'auth_biometric_login_token_marker';
const AUTHENTICATION_PROMPT = 'Подтвердите личность, чтобы войти без пароля';

export type SecureLoginTokenResult =
  | { status: 'success'; token: string }
  | { status: 'not_configured' }
  | { status: 'invalidated' }
  | { status: 'error'; error: LocalAuthenticationErrorCode };

function isSecureStoreUsable(): boolean {
  return AUTH_API_MODE !== 'demo' && Platform.OS !== 'web';
}

/**
 * SecureStore не отдаёт структурированные коды ошибок (в отличие от
 * LocalAuthentication.LocalAuthenticationError), поэтому маппинг —
 * best-effort по тексту нативной ошибки. Стоит перепроверить формулировки
 * на реальных iOS/Android устройствах при QA и donastроить при необходимости.
 */
function mapNativeErrorToAuthErrorCode(error: unknown): LocalAuthenticationErrorCode {
  const message = error instanceof Error ? error.message.toLowerCase() : '';

  if (message.includes('cancel')) {
    return 'user_cancel';
  }

  if (message.includes('lockout')) {
    return 'lockout';
  }

  if (message.includes('not_enrolled') || message.includes('no biometric')) {
    return 'not_enrolled';
  }

  if (message.includes('passcode')) {
    return 'passcode_not_set';
  }

  return 'unknown';
}

export async function saveSecureLoginToken(token: string): Promise<void> {
  if (!isSecureStoreUsable()) {
    return;
  }

  await SecureStore.setItemAsync(MARKER_KEY, '1');
  await SecureStore.setItemAsync(TOKEN_KEY, token, {
    requireAuthentication: true,
    authenticationPrompt: AUTHENTICATION_PROMPT,
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getSecureLoginToken(): Promise<SecureLoginTokenResult> {
  if (!isSecureStoreUsable()) {
    return { status: 'not_configured' };
  }

  const marker = await SecureStore.getItemAsync(MARKER_KEY);

  if (!marker) {
    return { status: 'not_configured' };
  }

  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY, {
      requireAuthentication: true,
      authenticationPrompt: AUTHENTICATION_PROMPT,
    });

    if (token === null) {
      // Маркер есть, а значение нет — ключ инвалидирован сменой биометрии
      // на устройстве (docs/SecureStore: "Data persistence"). Считаем это
      // сбросом биометрии и подчищаем маркер.
      await clearSecureLoginToken();
      return { status: 'invalidated' };
    }

    return { status: 'success', token };
  } catch (error) {
    return { status: 'error', error: mapNativeErrorToAuthErrorCode(error) };
  }
}

export async function clearSecureLoginToken(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => undefined),
    SecureStore.deleteItemAsync(MARKER_KEY).catch(() => undefined),
  ]);
}
