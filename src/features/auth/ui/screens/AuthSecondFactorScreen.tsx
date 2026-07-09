import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { authenticateWithBiometric, getBiometricAvailability } from '../../lib/biometricAuth';
import { formatIdentifierForBadge } from '../../lib/otp';
import { useAuth } from '../../model/AuthContext';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { AuthMethodOptionCard } from '../components/AuthMethodOptionCard';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthSecondFactorNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthSecondFactor'
>;

export function AuthSecondFactorScreen() {
  const navigation = useNavigation<AuthSecondFactorNavigationProp>();
  const { loginAsClient } = useAuth();
  const { identifier, pinDraft, biometricEnabled } = useAuthFlow();
  const [biometricLabel, setBiometricLabel] = useState('Face ID / Touch ID');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void getBiometricAvailability().then((availability) => {
      setBiometricLabel(availability.label);
    });
  }, []);

  const otpSubtitle = useMemo(() => {
    if (!identifier) {
      return 'Отправлен на ваш номер или email';
    }

    const formatted = formatIdentifierForBadge(
      identifier.type,
      identifier.value,
      identifier.phoneNumber,
      identifier.countryCode,
    );

    return `Отправлен на ${formatted}`;
  }, [identifier]);

  const handleOtpPress = () => {
    if (!identifier) {
      return;
    }

    setError('');
    navigation.navigate('AuthOtp', {
      identifierType: identifier.type,
      identifierValue: identifier.value,
      purpose: 'login',
    });
  };

  const handlePinPress = () => {
    if (!pinDraft) {
      return;
    }

    setError('');
    navigation.navigate('AuthLoginPin');
  };

  const handleBiometricPress = async () => {
    if (!biometricEnabled) {
      return;
    }

    setError('');
    setIsBiometricLoading(true);

    const success = await authenticateWithBiometric('Подтвердите вход');

    setIsBiometricLoading(false);

    if (!success) {
      setError('Не удалось подтвердить вход по биометрии');
      return;
    }

    loginAsClient();
  };

  return (
    <AuthScreenLayout
      title="Подтверждение входа"
      subtitle="Второй фактор"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
    >
      <View style={styles.options}>
        <AuthMethodOptionCard
          title="OTP-код"
          subtitle={otpSubtitle}
          onPress={handleOtpPress}
          disabled={!identifier}
        />

        <AuthMethodOptionCard
          title="Пин-код"
          subtitle="6-значный код"
          onPress={handlePinPress}
          disabled={!pinDraft}
        />

        <AuthMethodOptionCard
          title="Биометрия"
          subtitle={biometricLabel}
          onPress={handleBiometricPress}
          disabled={!biometricEnabled}
          loading={isBiometricLoading}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: spacing.sm,
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
});
