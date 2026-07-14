import { AuthApiError } from '../errors';
import { AuthService } from '../types';

function notImplemented(): never {
  throw new AuthApiError('Реальный API авторизации ещё не подключён');
}

export const apiAuthService: AuthService = {
  sendIdentifier: notImplemented,
  resendOtp: notImplemented,
  verifyRegistrationOtp: notImplemented,
  setPassword: notImplemented,
  registerPin: notImplemented,
  enableBiometric: notImplemented,
  login: notImplemented,
  verifyLoginOtp: notImplemented,
  verifyLoginPin: notImplemented,
  verifyLoginBiometric: notImplemented,
  loginWithPin: notImplemented,
  loginWithBiometric: notImplemented,
  requestPasswordReset: notImplemented,
  verifyRecoveryOtp: notImplemented,
  resetPassword: notImplemented,
};
