import { Linking } from 'react-native';

import { LocalAuthenticationErrorCode } from './biometricAuth';

/**
 * Преобразует код ошибки биометрии в готовое к отображению UI-действие.
 * Логика вынесена из экранов, чтобы UI оставался "глупым" и одинаково
 * обрабатывал ошибки и от authenticateWithBiometric, и от getSecureLoginToken.
 */
export type BiometricErrorAction =
  | { kind: 'silent' }
  | { kind: 'suggest_pin'; message: string }
  | { kind: 'open_settings'; message: string }
  | { kind: 'generic_error'; message: string };

export function resolveBiometricErrorAction(
  error: LocalAuthenticationErrorCode,
): BiometricErrorAction {
  switch (error) {
    case 'user_cancel':
    case 'app_cancel':
    case 'system_cancel':
      return { kind: 'silent' };
    case 'lockout':
      return {
        kind: 'suggest_pin',
        message: 'Слишком много попыток. Войдите по пин-коду или паролю.',
      };
    case 'not_enrolled':
    case 'passcode_not_set':
      return {
        kind: 'open_settings',
        message: 'Биометрия не настроена на устройстве. Настройте Face ID / Touch ID в системных настройках.',
      };
    default:
      return { kind: 'generic_error', message: 'Не удалось подтвердить биометрию' };
  }
}

export function openBiometricSettings(): void {
  void Linking.openSettings();
}
