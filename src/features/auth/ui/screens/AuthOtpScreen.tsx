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
import { formatIdentifierForBadge, isOtpComplete, OTP_LENGTH } from '../../lib/otp';
import { useAuth } from '../../model/AuthContext';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useResendTimer } from '../../model/useResendTimer';
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
  const { loginAsClient } = useAuth();
  const { identifier } = useAuthFlow();
  const { secondsLeft, canResend, restart } = useResendTimer(42);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const purpose = route.params.purpose ?? 'registration';
  const isLoginFlow = purpose === 'login';

  const identifierType = identifier?.type ?? route.params.identifierType;
  const identifierValue = identifier?.value ?? route.params.identifierValue;

  const subtitle = useMemo(() => {
    if (isLoginFlow) {
      return identifierType === 'phone'
        ? 'Введите код из SMS для входа'
        : 'Введите код из email для входа';
    }

    return identifierType === 'phone'
      ? 'Введите код из SMS'
      : 'Введите код из email';
  }, [identifierType, isLoginFlow]);

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

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });

    setIsSubmitting(false);

    if (isLoginFlow) {
      loginAsClient();
      return;
    }

    navigation.navigate('AuthCreatePassword');
  };

  const handleResendPress = () => {
    restart();
    setCode('');
    setError('');
  };

  const handleAlternateChannelPress = () => {
    if (isLoginFlow) {
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
            {isLoginFlow ? 'Подтверждение входа' : 'Подтверждение'}
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
          loading={isSubmitting}
        />

        {!isLoginFlow ? (
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
