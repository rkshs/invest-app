import { AuthApiError } from '../errors';
import { AuthService } from '../types';
import {
  applyPasswordReset,
  applySetPassword,
  assertBiometricEnabled,
  assertOtpCode,
  buildAuthSuccess,
  createLoginToken,
  createVerificationToken,
  getLoginSession,
  getOtpSession,
  hasBiometricForIdentifier,
  hasPinForIdentifier,
  registerPinForIdentifier,
  saveOtpSession,
  setBiometricForIdentifier,
  simulateNetwork,
  verifyPassword,
  verifyPin,
} from './demoAuthStore';

export const demoAuthService: AuthService = {
  async sendIdentifier({ identifier }) {
    const sessionId = saveOtpSession('registration', identifier);
    return simulateNetwork({ sessionId });
  },

  async resendOtp(sessionId) {
    getOtpSession(sessionId);
    await simulateNetwork(undefined, 360);
  },

  async verifyRegistrationOtp({ sessionId, code }) {
    assertOtpCode(code);
    const session = getOtpSession(sessionId);

    if (session.kind !== 'registration') {
      throw new AuthApiError('Неверный тип подтверждения');
    }

    const verificationToken = createVerificationToken(session.identifier.value);
    return simulateNetwork({ verificationToken });
  },

  async setPassword({ verificationToken, password }) {
    applySetPassword(verificationToken, password);
    await simulateNetwork(undefined);
  },

  async registerPin({ identifierValue, pin }) {
    if (pin && !/^\d{6}$/.test(pin)) {
      throw new AuthApiError('Пин-код должен содержать 6 цифр');
    }

    registerPinForIdentifier(identifierValue, pin);
    await simulateNetwork(undefined, 320);
  },

  async enableBiometric({ identifierValue, enabled }) {
    setBiometricForIdentifier(identifierValue, enabled);
    await simulateNetwork(undefined, 280);
  },

  async login({ identifier, password }) {
    verifyPassword(identifier.value, password);
    const loginToken = createLoginToken(identifier.value);
    return simulateNetwork({ loginToken });
  },

  async verifyLoginOtp({ loginToken, code }) {
    assertOtpCode(code);
    const session = getLoginSession(loginToken);
    return simulateNetwork(buildAuthSuccess(session.identifierValue));
  },

  async verifyLoginPin({ loginToken, pin }) {
    const session = getLoginSession(loginToken);
    verifyPin(session.identifierValue, pin);
    return simulateNetwork(buildAuthSuccess(session.identifierValue));
  },

  async verifyLoginBiometric(loginToken) {
    const session = getLoginSession(loginToken);
    assertBiometricEnabled(session.identifierValue);
    return simulateNetwork(buildAuthSuccess(session.identifierValue));
  },

  async loginWithPin({ identifierValue, pin }) {
    if (!hasPinForIdentifier(identifierValue)) {
      throw new AuthApiError('Пин-код не настроен');
    }

    verifyPin(identifierValue, pin);
    return simulateNetwork(buildAuthSuccess(identifierValue));
  },

  async loginWithBiometric({ identifierValue }) {
    assertBiometricEnabled(identifierValue);
    return simulateNetwork(buildAuthSuccess(identifierValue));
  },

  async requestPasswordReset({ identifier, channel }) {
    if (identifier.type !== channel) {
      throw new AuthApiError('Выбранный способ восстановления недоступен');
    }

    const sessionId = saveOtpSession('recovery', identifier);
    return simulateNetwork({ sessionId });
  },

  async verifyRecoveryOtp({ sessionId, code }) {
    assertOtpCode(code);
    const session = getOtpSession(sessionId);

    if (session.kind !== 'recovery') {
      throw new AuthApiError('Неверный тип подтверждения');
    }

    const verificationToken = createVerificationToken(session.identifier.value);
    return simulateNetwork({ verificationToken });
  },

  async resetPassword({ verificationToken, password }) {
    applyPasswordReset(verificationToken, password);
    await simulateNetwork(undefined);
  },
};
