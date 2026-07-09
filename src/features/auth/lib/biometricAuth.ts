import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

export type BiometricAvailability = {
  isAvailable: boolean;
  label: string;
};

export async function getBiometricAvailability(): Promise<BiometricAvailability> {
  if (Platform.OS === 'web') {
    return {
      isAvailable: true,
      label: 'Face ID / Touch ID',
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

export async function authenticateWithBiometric(
  promptMessage = 'Подтвердите включение биометрии',
): Promise<boolean> {
  if (Platform.OS === 'web') {
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    return true;
  }

  const availability = await getBiometricAvailability();

  if (!availability.isAvailable) {
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage,
    cancelLabel: 'Отмена',
    disableDeviceFallback: false,
  });

  return result.success;
}
