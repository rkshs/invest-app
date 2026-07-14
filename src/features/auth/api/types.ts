import { UserRole } from '../../../entities/session/types';

export type AuthIdentifierPayload = {
  type: 'phone' | 'email';
  value: string;
  countryCode?: string;
  phoneNumber?: string;
};

export type SendIdentifierResponse = {
  sessionId: string;
};

export type VerifyOtpResponse = {
  verificationToken: string;
};

export type LoginResponse = {
  loginToken: string;
};

export type AuthSuccessResponse = {
  userId: string;
  accessToken: string;
  role: UserRole;
};

export type SendIdentifierParams = {
  identifier: AuthIdentifierPayload;
};

export type VerifyRegistrationOtpParams = {
  sessionId: string;
  code: string;
};

export type SetPasswordParams = {
  verificationToken: string;
  password: string;
};

export type RegisterPinParams = {
  identifierValue: string;
  pin: string | null;
};

export type EnableBiometricParams = {
  identifierValue: string;
  enabled: boolean;
};

export type LoginParams = {
  identifier: AuthIdentifierPayload;
  password: string;
};

export type VerifyLoginOtpParams = {
  loginToken: string;
  code: string;
};

export type VerifyLoginPinParams = {
  loginToken: string;
  pin: string;
};

export type QuickPinLoginParams = {
  identifierValue: string;
  pin: string;
};

export type QuickBiometricLoginParams = {
  identifierValue: string;
};

export type RequestPasswordResetParams = {
  identifier: AuthIdentifierPayload;
  channel: 'phone' | 'email';
};

export type VerifyRecoveryOtpParams = {
  sessionId: string;
  code: string;
};

export type ResetPasswordParams = {
  verificationToken: string;
  password: string;
};

export type AuthService = {
  sendIdentifier: (params: SendIdentifierParams) => Promise<SendIdentifierResponse>;
  resendOtp: (sessionId: string) => Promise<void>;
  verifyRegistrationOtp: (
    params: VerifyRegistrationOtpParams,
  ) => Promise<VerifyOtpResponse>;
  setPassword: (params: SetPasswordParams) => Promise<void>;
  registerPin: (params: RegisterPinParams) => Promise<void>;
  enableBiometric: (params: EnableBiometricParams) => Promise<void>;
  login: (params: LoginParams) => Promise<LoginResponse>;
  verifyLoginOtp: (params: VerifyLoginOtpParams) => Promise<AuthSuccessResponse>;
  verifyLoginPin: (params: VerifyLoginPinParams) => Promise<AuthSuccessResponse>;
  verifyLoginBiometric: (loginToken: string) => Promise<AuthSuccessResponse>;
  loginWithPin: (params: QuickPinLoginParams) => Promise<AuthSuccessResponse>;
  loginWithBiometric: (
    params: QuickBiometricLoginParams,
  ) => Promise<AuthSuccessResponse>;
  requestPasswordReset: (
    params: RequestPasswordResetParams,
  ) => Promise<SendIdentifierResponse>;
  verifyRecoveryOtp: (params: VerifyRecoveryOtpParams) => Promise<VerifyOtpResponse>;
  resetPassword: (params: ResetPasswordParams) => Promise<void>;
};
