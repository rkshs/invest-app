import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import { formatIdentifierForBadge } from '../../lib/otp';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useRequestPasswordResetMutation } from '../../model/useAuthMutations';
import { AuthMethodOptionCard } from '../components/AuthMethodOptionCard';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthRecoveryMethodNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthRecoveryMethod'
>;

export function AuthRecoveryMethodScreen() {
  const navigation = useNavigation<AuthRecoveryMethodNavigationProp>();
  const { identifier, setAuthSessionId } = useAuthFlow();
  const requestPasswordResetMutation = useRequestPasswordResetMutation();
  const [activeChannel, setActiveChannel] = useState<'phone' | 'email' | null>(null);
  const [error, setError] = useState('');

  const phoneSubtitle = useMemo(() => {
    if (!identifier || identifier.type !== 'phone') {
      return 'Доступно при регистрации по телефону';
    }

    return `Отправим на ${formatIdentifierForBadge(
      identifier.type,
      identifier.value,
      identifier.phoneNumber,
      identifier.countryCode,
    )}`;
  }, [identifier]);

  const emailSubtitle = useMemo(() => {
    if (!identifier || identifier.type !== 'email') {
      return 'Доступно при регистрации по email';
    }

    return `Отправим на ${identifier.value}`;
  }, [identifier]);

  const handleMethodPress = async (channel: 'phone' | 'email') => {
    if (!identifier || identifier.type !== channel) {
      return;
    }

    setError('');
    setActiveChannel(channel);

    try {
      const response = await requestPasswordResetMutation.mutateAsync({
        identifier,
        channel,
      });
      setAuthSessionId(response.sessionId);
      navigation.navigate('AuthOtp', {
        identifierType: identifier.type,
        identifierValue: identifier.value,
        purpose: 'recovery',
      });
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось отправить код'));
    } finally {
      setActiveChannel(null);
    }
  };

  return (
    <AuthScreenLayout
      title="Восстановление пароля"
      subtitle="Выберите способ получения кода"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
    >
      <View style={styles.options}>
        <AuthMethodOptionCard
          title="SMS"
          subtitle={phoneSubtitle}
          onPress={() => handleMethodPress('phone')}
          disabled={!identifier || identifier.type !== 'phone' || requestPasswordResetMutation.isPending}
          loading={requestPasswordResetMutation.isPending && activeChannel === 'phone'}
        />

        <AuthMethodOptionCard
          title="Email"
          subtitle={emailSubtitle}
          onPress={() => handleMethodPress('email')}
          disabled={!identifier || identifier.type !== 'email' || requestPasswordResetMutation.isPending}
          loading={requestPasswordResetMutation.isPending && activeChannel === 'email'}
        />
      </View>

      {!identifier ? (
        <Text style={styles.hint}>
          Не найден сохранённый телефон или email. Вернитесь на экран входа.
        </Text>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: spacing.sm,
  },
  hint: {
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
});
