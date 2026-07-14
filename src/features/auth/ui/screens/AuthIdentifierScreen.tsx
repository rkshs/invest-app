import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import {
  buildFullPhone,
  isValidCountryCode,
  isValidEmail,
  isValidPhoneNumber,
  normalizeCountryCode,
} from '../../lib/validateIdentifier';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useSendIdentifierMutation } from '../../model/useAuthMutations';
import { AuthLegalFooter } from '../components/AuthLegalFooter';
import { AuthPhoneInput } from '../components/AuthPhoneInput';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthSeparator } from '../components/AuthSeparator';
import { AuthTextInput } from '../components/AuthTextInput';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, typography } from '../../../../shared/theme';

type AuthIdentifierNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthIdentifier'
>;

type ActiveIdentifierField = 'phone' | 'email' | null;

export function AuthIdentifierScreen() {
  const navigation = useNavigation<AuthIdentifierNavigationProp>();
  const { setIdentifier, setAuthSessionId } = useAuthFlow();
  const sendIdentifierMutation = useSendIdentifierMutation();
  const [activeField, setActiveField] = useState<ActiveIdentifierField>(null);
  const [countryCode, setCountryCode] = useState('+357');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const phoneDisabled = activeField === 'email';
  const emailDisabled = activeField === 'phone';

  const phoneIsComplete =
    isValidCountryCode(countryCode) && isValidPhoneNumber(phone);
  const emailIsComplete = isValidEmail(email);

  const canContinue = phoneIsComplete || emailIsComplete;

  const phoneError = useMemo(() => {
    if (!submitted || activeField !== 'phone' || phoneIsComplete) {
      return undefined;
    }

    if (!isValidCountryCode(countryCode)) {
      return 'Введите корректный код страны';
    }

    return 'Введите корректный номер телефона';
  }, [activeField, countryCode, phoneIsComplete, submitted]);

  const emailError = useMemo(() => {
    if (!submitted || activeField !== 'email' || emailIsComplete) {
      return undefined;
    }

    return 'Введите корректный email';
  }, [activeField, emailIsComplete, submitted]);

  const handlePhoneFocus = () => {
    setActiveField('phone');
    setEmail('');
    setSubmitted(false);
    setError('');
  };

  const handleEmailFocus = () => {
    setActiveField('email');
    setPhone('');
    setSubmitted(false);
    setError('');
  };

  const handleCountryCodeChange = (value: string) => {
    setActiveField('phone');
    setEmail('');
    setCountryCode(value);
    setSubmitted(false);
    setError('');
  };

  const handlePhoneChange = (value: string) => {
    setActiveField('phone');
    setEmail('');
    setPhone(value);
    setSubmitted(false);
    setError('');
  };

  const handleEmailChange = (value: string) => {
    setActiveField('email');
    setPhone('');
    setEmail(value);
    setSubmitted(false);
    setError('');
  };

  const handleContinue = async () => {
    setSubmitted(true);
    setError('');

    if (!canContinue) {
      return;
    }

    try {
      if (phoneIsComplete && activeField !== 'email') {
        const normalizedCountryCode = normalizeCountryCode(countryCode);
        const identifier = {
          type: 'phone' as const,
          value: buildFullPhone(normalizedCountryCode, phone),
          countryCode: normalizedCountryCode,
          phoneNumber: phone,
        };

        const response = await sendIdentifierMutation.mutateAsync({ identifier });
        setIdentifier(identifier);
        setAuthSessionId(response.sessionId);
        navigation.navigate('AuthOtp', {
          identifierType: identifier.type,
          identifierValue: identifier.value,
        });
        return;
      }

      if (emailIsComplete) {
        const identifier = {
          type: 'email' as const,
          value: email.trim(),
        };

        const response = await sendIdentifierMutation.mutateAsync({ identifier });
        setIdentifier(identifier);
        setAuthSessionId(response.sessionId);
        navigation.navigate('AuthOtp', {
          identifierType: identifier.type,
          identifierValue: identifier.value,
        });
      }
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось отправить код'));
    }
  };

  return (
    <AuthScreenLayout
      title="Вход в систему"
      subtitle="Введите телефон или email"
      footer={<AuthLegalFooter />}
    >
      <AuthPhoneInput
        countryCode={countryCode}
        phone={phone}
        onCountryCodeChange={handleCountryCodeChange}
        onPhoneChange={handlePhoneChange}
        onFocus={handlePhoneFocus}
        disabled={phoneDisabled}
        countryCodeError={phoneError}
        phoneError={phoneError}
      />

      <AuthSeparator />

      <AuthTextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        onFocus={handleEmailFocus}
        placeholder="example@email.com"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        editable={!emailDisabled}
        error={emailError}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <AuthPrimaryButton
        label="Продолжить"
        onPress={handleContinue}
        disabled={!canContinue}
        loading={sendIdentifierMutation.isPending}
      />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
});
