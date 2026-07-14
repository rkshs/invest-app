import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import { formatIdentifierForBadge, isOtpComplete, OTP_LENGTH } from '../../lib/otp';
import { useCompleteAuthLogin } from '../../model/useCompleteAuthLogin';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useResendTimer } from '../../model/useResendTimer';
import {
  useResendOtpMutation,
  useVerifyLoginOtpMutation,
  useVerifyRecoveryOtpMutation,
  useVerifyRegistrationOtpMutation,
} from '../../model/useAuthMutations';
import { AuthIdentifierBadge } from '../components/AuthIdentifierBadge';
import { AuthNumericKeypad } from '../components/AuthNumericKeypad';
import { AuthOtpInput } from '../components/AuthOtpInput';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthResendTimer } from '../components/AuthResendTimer';
import { AuthTextLink } from '../components/AuthTextLink';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthOtpRouteProp = RouteProp<AuthStackParamList, 'AuthOtp'>;
type AuthOtpNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'AuthOtp'>;

const isWeb = Platform.OS === 'web';

export function AuthOtpScreen() {
  const route = useRoute<AuthOtpRouteProp>();
  const navigation = useNavigation<AuthOtpNavigationProp>();
  const insets = useSafeAreaInsets();
  const completeAuthLogin = useCompleteAuthLogin();
  const {
    identifier,
    authSessionId,
    loginToken,
    setVerificationToken,
  } = useAuthFlow();
  const verifyRegistrationOtpMutation = useVerifyRegistrationOtpMutation();
  const verifyRecoveryOtpMutation = useVerifyRecoveryOtpMutation();
  const verifyLoginOtpMutation = useVerifyLoginOtpMutation();
  const resendOtpMutation = useResendOtpMutation();
  const { secondsLeft, canResend, restart } = useResendTimer(42);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const purpose = route.params.purpose ?? 'registration';
  const isLoginFlow = purpose === 'login';
  const isRecoveryFlow = purpose === 'recovery';

  const identifierType = identifier?.type ?? route.params.identifierType;
  const identifierValue = identifier?.value ?? route.params.identifierValue;

  const isSubmitting =
    verifyRegistrationOtpMutation.isPending ||
    verifyRecoveryOtpMutation.isPending ||
    verifyLoginOtpMutation.isPending;

  const subtitle = useMemo(() => {
    if (isRecoveryFlow) {
      return identifierType === 'phone'
        ? 'Введите код из SMS для восстановления'
        : 'Введите код из email для восстановления';
    }

    if (isLoginFlow) {
      return identifierType === 'phone'
        ? 'Введите код из SMS для входа'
        : 'Введите код из email для входа';
    }

    return identifierType === 'phone'
      ? 'Введите код из SMS'
      : 'Введите код из email';
  }, [identifierType, isLoginFlow, isRecoveryFlow]);

  const badgeLabel = useMemo(
    () =>
      formatIdentifierForBadge(
        identifierType,
        identifierValue,
        identifier?.phoneNumber,
        identifier?.countryCode,
      ),
    [identifier?.countryCode, identifier?.phoneNumber, identifierType, identifierValue],
  );

  const alternateChannelLabel = useMemo(
    () =>
      identifierType === 'phone'
        ? 'Получить код на email'
        : 'Получить код по SMS',
    [identifierType],
  );

  const changeIdentifierLabel = useMemo(
    () =>
      identifierType === 'phone' ? 'Изменить номер' : 'Изменить email',
    [identifierType],
  );

  const canConfirm = isOtpComplete(code);

  const handleDigitPress = (digit: string) => {
    setError('');
    setCode((current) => {
      if (current.length >= OTP_LENGTH) {
        return current;
      }

      return `${current}${digit}`;
    });
  };

  const handleBackspacePress = () => {
    setError('');
    setCode((current) => current.slice(0, -1));
  };

  const handleCodeChange = (nextCode: string) => {
    setError('');
    setCode(nextCode.replace(/\D/g, '').slice(0, OTP_LENGTH));
  };

  const handleConfirm = async () => {
    if (!isOtpComplete(code)) {
      setError('Введите код из 6 цифр');
      return;
    }

    setError('');

    try {
      if (isLoginFlow) {
        if (!loginToken) {
          throw new Error('Сессия входа не найдена');
        }

        const response = await verifyLoginOtpMutation.mutateAsync({
          loginToken,
          code,
        });
        completeAuthLogin(response);
        return;
      }

      if (!authSessionId) {
        throw new Error('Сессия подтверждения не найдена');
      }

      if (isRecoveryFlow) {
        const response = await verifyRecoveryOtpMutation.mutateAsync({
          sessionId: authSessionId,
          code,
        });
        setVerificationToken(response.verificationToken);
        navigation.navigate('AuthResetPassword');
        return;
      }

      const response = await verifyRegistrationOtpMutation.mutateAsync({
        sessionId: authSessionId,
        code,
      });
      setVerificationToken(response.verificationToken);
      navigation.navigate('AuthCreatePassword');
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось подтвердить код'));
    }
  };

  const handleResendPress = async () => {
    if (isLoginFlow) {
      restart();
      setCode('');
      setError('');
      return;
    }

    if (!authSessionId) {
      setError('Сессия подтверждения не найдена');
      return;
    }

    setError('');

    try {
      await resendOtpMutation.mutateAsync(authSessionId);
      restart();
      setCode('');
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось отправить код повторно'));
    }
  };

  const handleAlternateChannelPress = () => {
    if (isLoginFlow || isRecoveryFlow) {
      navigation.goBack();
      return;
    }

    navigation.navigate('AuthIdentifier');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: spacing.xl,
            paddingTop: insets.top + spacing.xl,
            paddingBottom: isWeb ? spacing.lg : Math.max(insets.bottom, spacing.lg),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {isRecoveryFlow
              ? 'Восстановление пароля'
              : isLoginFlow
                ? 'Подтверждение входа'
                : 'Подтверждение'}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <AuthIdentifierBadge label={badgeLabel} />

        <AuthTextLink
          label={changeIdentifierLabel}
          onPress={() => navigation.goBack()}
        />

        <AuthOtpInput
          value={code}
          onChange={handleCodeChange}
          hasError={Boolean(error)}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthResendTimer
          secondsLeft={secondsLeft}
          canResend={canResend}
          onResendPress={handleResendPress}
        />

        <AuthPrimaryButton
          label="Подтвердить"
          onPress={handleConfirm}
          disabled={!canConfirm}
          loading={isSubmitting || resendOtpMutation.isPending}
        />

        {!isLoginFlow && !isRecoveryFlow ? (
          <AuthTextLink
            label={alternateChannelLabel}
            onPress={handleAlternateChannelPress}
          />
        ) : null}
      </ScrollView>

      {isWeb ? (
        <View style={styles.keypadContainer}>
          <AuthNumericKeypad
            onDigitPress={handleDigitPress}
            onBackspacePress={handleBackspacePress}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    paddingTop: spacing.sm,
  },
  header: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
  keypadContainer: {
    paddingHorizontal: spacing.xl,
  },
});
