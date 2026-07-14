import { resolveDemoRole, seedDemoTraderAccount } from './demoAccounts';
import { AuthApiError } from '../errors';
import { AuthIdentifierPayload } from '../types';

type OtpSession = {
  identifier: AuthIdentifierPayload;
  kind: 'registration' | 'recovery';
};

type VerificationRecord = {
  identifierValue: string;
};

type LoginSession = {
  identifierValue: string;
};

const otpSessions = new Map<string, OtpSession>();
const verificationTokens = new Map<string, VerificationRecord>();
const loginTokens = new Map<string, LoginSession>();
const passwords = new Map<string, string>();
const pins = new Map<string, string>();
const biometrics = new Set<string>();

seedDemoTraderAccount(
  (identifierValue, password) => {
    passwords.set(identifierValue, password);
  },
  (identifierValue, pin) => {
    pins.set(identifierValue, pin);
  },
);

let sessionCounter = 0;
let tokenCounter = 0;

export function createId(prefix: string): string {
  tokenCounter += 1;
  return `${prefix}-${Date.now()}-${tokenCounter}`;
}

export async function simulateNetwork<T>(value: T, delayMs = 520): Promise<T> {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs + Math.floor(Math.random() * 280));
  });

  return value;
}

export function assertOtpCode(code: string): void {
  if (!/^\d{6}$/.test(code)) {
    throw new AuthApiError('Введите код из 6 цифр');
  }
}

export function saveOtpSession(
  kind: OtpSession['kind'],
  identifier: AuthIdentifierPayload,
): string {
  sessionCounter += 1;
  const sessionId = `otp-session-${sessionCounter}`;
  otpSessions.set(sessionId, { identifier, kind });
  return sessionId;
}

export function getOtpSession(sessionId: string): OtpSession {
  const session = otpSessions.get(sessionId);

  if (!session) {
    throw new AuthApiError('Сессия подтверждения не найдена. Запросите код заново.');
  }

  return session;
}

export function createVerificationToken(identifierValue: string): string {
  const verificationToken = createId('verification');
  verificationTokens.set(verificationToken, { identifierValue });
  return verificationToken;
}

export function getVerificationRecord(token: string): VerificationRecord {
  const record = verificationTokens.get(token);

  if (!record) {
    throw new AuthApiError('Ссылка для смены пароля устарела. Запросите код заново.');
  }

  return record;
}

export function applySetPassword(verificationToken: string, password: string): void {
  const record = getVerificationRecord(verificationToken);
  passwords.set(record.identifierValue, password);
  verificationTokens.delete(verificationToken);
}

export function applyPasswordReset(verificationToken: string, password: string): void {
  applySetPassword(verificationToken, password);
}

export function registerPinForIdentifier(identifierValue: string, pin: string | null): void {
  if (!pin) {
    pins.delete(identifierValue);
    return;
  }

  pins.set(identifierValue, pin);
}

export function setBiometricForIdentifier(identifierValue: string, enabled: boolean): void {
  if (enabled) {
    biometrics.add(identifierValue);
    return;
  }

  biometrics.delete(identifierValue);
}

export function hasBiometricForIdentifier(identifierValue: string): boolean {
  return biometrics.has(identifierValue);
}

export function hasPinForIdentifier(identifierValue: string): boolean {
  return pins.has(identifierValue);
}

export function createLoginToken(identifierValue: string): string {
  const loginToken = createId('login');
  loginTokens.set(loginToken, { identifierValue });
  return loginToken;
}

export function getLoginSession(loginToken: string): LoginSession {
  const session = loginTokens.get(loginToken);

  if (!session) {
    throw new AuthApiError('Сессия входа устарела. Войдите снова.');
  }

  return session;
}

export function verifyPassword(identifierValue: string, password: string): void {
  const savedPassword = passwords.get(identifierValue);

  if (!savedPassword) {
    if (password.length < 8) {
      throw new AuthApiError('Неверный пароль');
    }

    return;
  }

  if (savedPassword !== password) {
    throw new AuthApiError('Неверный пароль');
  }
}

export function verifyPin(identifierValue: string, pin: string): void {
  const savedPin = pins.get(identifierValue);

  if (!savedPin || savedPin !== pin) {
    throw new AuthApiError('Неверный пин-код');
  }
}

export function assertBiometricEnabled(identifierValue: string): void {
  if (!biometrics.has(identifierValue)) {
    throw new AuthApiError('Биометрия не настроена');
  }
}

export function buildAuthSuccess(identifierValue: string) {
  return {
    userId: `user-${identifierValue}`,
    accessToken: createId('access'),
    role: resolveDemoRole(identifierValue),
  };
}
