import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import {
  authenticateWithBiometric,
  getBiometricAvailability,
} from '../../lib/biometricAuth';
import { useAuth } from '../../model/AuthContext';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { AuthBiometricIllustration } from '../components/AuthBiometricIllustration';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthSecondaryButton } from '../components/AuthSecondaryButton';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthBiometricNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthBiometric'
>;

export function AuthBiometricScreen() {
  const navigation = useNavigation<AuthBiometricNavigationProp>();
  const { loginAsClient } = useAuth();
  const { setBiometricEnabled, completeOnboarding } = useAuthFlow();
  const [biometricLabel, setBiometricLabel] = useState('Face ID / Touch ID');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isEnabling, setIsEnabling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void getBiometricAvailability().then((availability) => {
      setBiometricLabel(availability.label);
      setIsAvailable(availability.isAvailable);
    });
  }, []);

  const finishOnboarding = (enabled: boolean) => {
    setBiometricEnabled(enabled);
    completeOnboarding();
    loginAsClient();
  };

  const handleEnable = async () => {
    setError('');
    setIsEnabling(true);

    const success = await authenticateWithBiometric();

    setIsEnabling(false);

    if (!success) {
      setError('Не удалось включить биометрию. Попробуйте ещё раз или пропустите шаг.');
      return;
    }

    finishOnboarding(true);
  };

  const handleSkip = () => {
    finishOnboarding(false);
  };

  return (
    <AuthScreenLayout
      title="Биометрия"
      subtitle="Необязательно"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
      footer={
        <View style={styles.footer}>
          <AuthPrimaryButton
            label="Включить биометрию"
            onPress={handleEnable}
            loading={isEnabling}
            disabled={!isAvailable}
          />
          <AuthSecondaryButton
            label="Пропустить"
            onPress={handleSkip}
            disabled={isEnabling}
          />
        </View>
      }
    >
      <View style={styles.content}>
        <AuthBiometricIllustration />

        <View style={styles.info}>
          <Text style={styles.featureTitle}>{biometricLabel}</Text>
          <Text style={styles.featureDescription}>
            Для мгновенного входа без ввода пароля
          </Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!isAvailable ? (
          <Text style={styles.hint}>
            На этом устройстве биометрия недоступна — можно пропустить шаг.
          </Text>
        ) : null}
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  info: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  featureTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    textAlign: 'center',
  },
  featureDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
  hint: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    gap: spacing.sm,
  },
});
