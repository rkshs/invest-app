import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

import { AUTH_API_MODE } from '../config';

export type LocalAuthenticationErrorCode = LocalAuthentication.LocalAuthenticationError;

export type BiometricAuthResult =
  | { success: true }
  | { success: false; error: LocalAuthenticationErrorCode; warning?: string };

export type BiometricAvailability = {
  isAvailable: boolean;
  label: string;
};

export type BiometricAuthOptions = {
  promptMessage: string;
  cancelLabel?: string;
  disableDeviceFallback?: boolean;
  fallbackLabel?: string;
  promptSubtitle?: string;
  promptDescription?: string;
};

/**
 * Единая точка настройки LocalAuthentication.authenticateAsync.
 * Любой новый сценарий биометрии должен брать опции отсюда (или добавлять
 * рядом свою константу), а не задавать disableDeviceFallback инлайн в UI.
 */
export const LOGIN_BIOMETRIC_OPTIONS: BiometricAuthOptions = {
  promptMessage: 'Подтвердите вход',
  cancelLabel: 'Отмена',
  disableDeviceFallback: false,
};

export const ENABLE_BIOMETRIC_OPTIONS: BiometricAuthOptions = {
  promptMessage: 'Подтвердите включение биометрии',
  cancelLabel: 'Отмена',
  disableDeviceFallback: false,
};

/**
 * Для будущих критичных операций (подтверждение сделки, вывод средств):
 * disableDeviceFallback: true — запрещает откат на пасскод устройства,
 * биометрия обязательна. См. docs/SECURITY.md, раздел MASVS-AUTH.
 */
export const CRITICAL_OPERATION_BIOMETRIC_OPTIONS: BiometricAuthOptions = {
  promptMessage: 'Подтвердите операцию',
  cancelLabel: 'Отмена',
  disableDeviceFallback: true,
  fallbackLabel: '',
};

function buildNativeOptions(
  options: BiometricAuthOptions,
): LocalAuthentication.LocalAuthenticationOptions {
  return {
    ...options,
    // Android: разрешаем только сильную биометрию (Class 3 — отпечаток,
    // 3D-сканирование лица), а не слабую (Class 2, например 2D face unlock).
    ...(Platform.OS === 'android' ? { biometricsSecurityLevel: 'strong' as const } : null),
  };
}

export async function getBiometricAvailability(): Promise<BiometricAvailability> {
  if (Platform.OS === 'web') {
    if (AUTH_API_MODE === 'demo') {
      return {
        isAvailable: true,
        label: 'Face ID / Touch ID',
      };
    }

    return {
      isAvailable: false,
      label: 'Биометрия недоступна',
    };
  }

  const hasHardware = await LocalAuthentication.hasHardwareAsync();

  if (!hasHardware) {
    return {
      isAvailable: false,
      label: 'Биометрия недоступна',
    };
  }

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const hasFaceId = supportedTypes.includes(
    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
  );
  const hasFingerprint = supportedTypes.includes(
    LocalAuthentication.AuthenticationType.FINGERPRINT,
  );

  let label = 'Биометрия';

  if (hasFaceId && hasFingerprint) {
    label = 'Face ID / Touch ID';
  } else if (hasFaceId) {
    label = 'Face ID';
  } else if (hasFingerprint) {
    label = 'Touch ID';
  }

  return {
    isAvailable: isEnrolled,
    label,
  };
}

/**
 * Запрашивает подтверждение через Face ID / Touch ID (LocalAuthentication).
 *
 * Важно: в prod-режиме для входа без пароля (см. secureLoginToken.ts) эта
 * функция не используется — там сам факт чтения токена из SecureStore с
 * requireAuthentication уже требует биометрию на уровне ОС, и повторный
 * вызов authenticateAsync привёл бы к двойному системному диалогу.
 * authenticateWithBiometric остаётся точкой входа для: (1) онбординга
 * (проверка/включение биометрии, секрета ещё нет), (2) demo-режима везде.
 */
export async function authenticateWithBiometric(
  options: BiometricAuthOptions = LOGIN_BIOMETRIC_OPTIONS,
): Promise<BiometricAuthResult> {
  if (Platform.OS === 'web') {
    if (AUTH_API_MODE !== 'demo') {
      return { success: false, error: 'not_available' };
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    return { success: true };
  }

  const availability = await getBiometricAvailability();

  if (!availability.isAvailable) {
    return { success: false, error: 'not_enrolled' };
  }

  const result = await LocalAuthentication.authenticateAsync(buildNativeOptions(options));

  if (result.success) {
    return { success: true };
  }

  return { success: false, error: result.error, warning: result.warning };
}
