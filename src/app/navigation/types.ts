import type { AuthOtpPurpose } from '../../features/auth/lib/authOtpPurpose';

export type AuthStackParamList = {
  AuthIdentifier: undefined;
  AuthLogin: undefined;
  AuthSecondFactor: undefined;
  AuthOtp: {
    identifierType: 'phone' | 'email';
    identifierValue: string;
    purpose?: AuthOtpPurpose;
  };
  AuthCreatePassword: undefined;
  AuthPinCode: undefined;
  AuthBiometric: undefined;
  AuthLoginPin: undefined;
  AuthRecoveryMethod: undefined;
  AuthResetPassword: undefined;
};

export type ClientStackParamList = {
  Home: undefined;
  Account: { accountId: string };
  Markets: undefined;
  ChatDetail: { chatId: string };
  Settings: undefined;
};

export type TraderStackParamList = {
  TraderChatList: undefined;
  TraderClientSubChats: { parentChatId: string; clientName: string };
  TraderChatDetail: { chatId: string };
  TraderClientPortfolio: { accountId: string; clientName: string };
  TraderSettings: undefined;
};
