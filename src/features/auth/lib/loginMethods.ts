import { AUTH_API_MODE } from '../config';
import {
  hasBiometricForIdentifier,
  hasPinForIdentifier,
} from '../api/demo/demoAuthStore';

type LoginMethodContext = {
  pinDraft: string | null;
  biometricEnabled: boolean;
};

export function getLoginMethodAvailability(
  identifierValue: string | null,
  context: LoginMethodContext,
): { canUsePin: boolean; canUseBiometric: boolean } {
  if (!identifierValue) {
    return { canUsePin: false, canUseBiometric: false };
  }

  if (AUTH_API_MODE === 'demo') {
    return {
      canUsePin: hasPinForIdentifier(identifierValue),
      canUseBiometric: hasBiometricForIdentifier(identifierValue),
    };
  }

  return {
    canUsePin: Boolean(context.pinDraft),
    canUseBiometric: context.biometricEnabled,
  };
}
