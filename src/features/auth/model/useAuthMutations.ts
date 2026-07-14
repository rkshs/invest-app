import { useMutation } from '@tanstack/react-query';

import { getAuthService } from '../api/getAuthService';
import {
  EnableBiometricParams,
  LoginParams,
  QuickBiometricLoginParams,
  QuickPinLoginParams,
  RegisterPinParams,
  RequestPasswordResetParams,
  ResetPasswordParams,
  SendIdentifierParams,
  SetPasswordParams,
  VerifyLoginOtpParams,
  VerifyLoginPinParams,
  VerifyRecoveryOtpParams,
  VerifyRegistrationOtpParams,
} from '../api/types';

const authService = getAuthService();

export function useSendIdentifierMutation() {
  return useMutation({
    mutationFn: (params: SendIdentifierParams) => authService.sendIdentifier(params),
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: (sessionId: string) => authService.resendOtp(sessionId),
  });
}

export function useVerifyRegistrationOtpMutation() {
  return useMutation({
    mutationFn: (params: VerifyRegistrationOtpParams) =>
      authService.verifyRegistrationOtp(params),
  });
}

export function useSetPasswordMutation() {
  return useMutation({
    mutationFn: (params: SetPasswordParams) => authService.setPassword(params),
  });
}

export function useRegisterPinMutation() {
  return useMutation({
    mutationFn: (params: RegisterPinParams) => authService.registerPin(params),
  });
}

export function useEnableBiometricMutation() {
  return useMutation({
    mutationFn: (params: EnableBiometricParams) => authService.enableBiometric(params),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (params: LoginParams) => authService.login(params),
  });
}

export function useVerifyLoginOtpMutation() {
  return useMutation({
    mutationFn: (params: VerifyLoginOtpParams) => authService.verifyLoginOtp(params),
  });
}

export function useVerifyLoginPinMutation() {
  return useMutation({
    mutationFn: (params: VerifyLoginPinParams) => authService.verifyLoginPin(params),
  });
}

export function useVerifyLoginBiometricMutation() {
  return useMutation({
    mutationFn: (loginToken: string) => authService.verifyLoginBiometric(loginToken),
  });
}

export function useQuickPinLoginMutation() {
  return useMutation({
    mutationFn: (params: QuickPinLoginParams) => authService.loginWithPin(params),
  });
}

export function useQuickBiometricLoginMutation() {
  return useMutation({
    mutationFn: (params: QuickBiometricLoginParams) =>
      authService.loginWithBiometric(params),
  });
}

export function useRequestPasswordResetMutation() {
  return useMutation({
    mutationFn: (params: RequestPasswordResetParams) =>
      authService.requestPasswordReset(params),
  });
}

export function useVerifyRecoveryOtpMutation() {
  return useMutation({
    mutationFn: (params: VerifyRecoveryOtpParams) =>
      authService.verifyRecoveryOtp(params),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (params: ResetPasswordParams) => authService.resetPassword(params),
  });
}
