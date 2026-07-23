import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import { AUTH_API_MODE } from '../../config';
import {
  authenticateWithBiometric,
  getBiometricAvailability,
  LOGIN_BIOMETRIC_OPTIONS,
} from '../../lib/biometricAuth';
import { openBiometricSettings, resolveBiometricErrorAction } from '../../lib/biometricErrorPresenter';
import { formatIdentifierForBadge } from '../../lib/otp';
import { getSecureLoginToken } from '../../lib/secureLoginToken';
import { useCompleteAuthLogin } from '../../model/useCompleteAuthLogin';
import { useAuthFlow } from '../../model/AuthFlowContext';
import {
  useVerifyLoginBiometricMutation,
} from '../../model/useAuthMutations';
import { AuthMethodOptionCard } from '../components/AuthMethodOptionCard';
import { AuthTextLink } from '../components/AuthTextLink';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthSecondFactorNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthSecondFactor'
>;

export function AuthSecondFactorScreen() {
  const navigation = useNavigation<AuthSecondFactorNavigationProp>();
  const completeAuthLogin = useCompleteAuthLogin();
  const { identifier, pinDraft, biometricEnabled, loginToken, resetBiometricAfterInvalidation } =
    useAuthFlow();
  const verifyLoginBiometricMutation = useVerifyLoginBiometricMutation();
  const [biometricLabel, setBiometricLabel] = useState('Face ID / Touch ID');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBiometricSettingsLink, setShowBiometricSettingsLink] = useState(false);

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
    if (!biometricEnabled || !loginToken) {
      return;
    }

    setError('');
    setShowBiometricSettingsLink(false);
    setIsBiometricLoading(true);

    let tokenToVerify: string | null = null;

    if (AUTH_API_MODE === 'demo') {
      const result = await authenticateWithBiometric(LOGIN_BIOMETRIC_OPTIONS);

      if (!result.success) {
        setIsBiometricLoading(false);
        const action = resolveBiometricErrorAction(result.error);

        if (action.kind !== 'silent') {
          setError(action.message);
          setShowBiometricSettingsLink(action.kind === 'open_settings');
        }

        return;
      }

      tokenToVerify = loginToken;
    } else {
      // Prod-режим: читаем loginToken из SecureStore. Сам факт его получения
      // с requireAuthentication уже требует биометрию на уровне ОС.
      const secureResult = await getSecureLoginToken();

      if (secureResult.status === 'invalidated') {
        resetBiometricAfterInvalidation();
        setIsBiometricLoading(false);
        setError('Биометрия на устройстве изменилась. Войдите с паролем.');
        navigation.reset({ index: 0, routes: [{ name: 'AuthLogin' }] });
        return;
      }

      if (secureResult.status === 'not_configured') {
        setIsBiometricLoading(false);
        setError('Биометрия ещё не настроена для этого устройства.');
        return;
      }

      if (secureResult.status === 'error') {
        setIsBiometricLoading(false);
        const action = resolveBiometricErrorAction(secureResult.error);

        if (action.kind !== 'silent') {
          setError(action.message);
          setShowBiometricSettingsLink(action.kind === 'open_settings');
        }

        return;
      }

      tokenToVerify = secureResult.token;
    }

    if (!tokenToVerify) {
      setIsBiometricLoading(false);
      setError('Не удалось подтвердить вход по биометрии');
      return;
    }

    try {
      const response = await verifyLoginBiometricMutation.mutateAsync(tokenToVerify);
      completeAuthLogin(response);
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось подтвердить вход по биометрии'));
    } finally {
      setIsBiometricLoading(false);
    }
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
          disabled={!biometricEnabled || !loginToken}
          loading={isBiometricLoading || verifyLoginBiometricMutation.isPending}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {showBiometricSettingsLink ? (
        <AuthTextLink label="Открыть настройки" onPress={openBiometricSettings} />
      ) : null}
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
