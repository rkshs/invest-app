import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import { AuthStackParamList } from '../../../../app/navigation';
import { useAuthFlow } from '../../model/AuthFlowContext';
import {
  buildFullPhone,
  isValidCountryCode,
  isValidEmail,
  isValidPhoneNumber,
  normalizeCountryCode,
} from '../../lib/validateIdentifier';
import { AuthLegalFooter } from '../components/AuthLegalFooter';
import { AuthPhoneInput } from '../components/AuthPhoneInput';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthSeparator } from '../components/AuthSeparator';
import { AuthTextInput } from '../components/AuthTextInput';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';

type AuthIdentifierNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthIdentifier'
>;

type ActiveIdentifierField = 'phone' | 'email' | null;

export function AuthIdentifierScreen() {
  const navigation = useNavigation<AuthIdentifierNavigationProp>();
  const { setIdentifier } = useAuthFlow();
  const [activeField, setActiveField] = useState<ActiveIdentifierField>(null);
  const [countryCode, setCountryCode] = useState('+357');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
  };

  const handleEmailFocus = () => {
    setActiveField('email');
    setPhone('');
    setSubmitted(false);
  };

  const handleCountryCodeChange = (value: string) => {
    setActiveField('phone');
    setEmail('');
    setCountryCode(value);
    setSubmitted(false);
  };

  const handlePhoneChange = (value: string) => {
    setActiveField('phone');
    setEmail('');
    setPhone(value);
    setSubmitted(false);
  };

  const handleEmailChange = (value: string) => {
    setActiveField('email');
    setPhone('');
    setEmail(value);
    setSubmitted(false);
  };

  const handleContinue = () => {
    setSubmitted(true);

    if (!canContinue) {
      return;
    }

    if (phoneIsComplete && activeField !== 'email') {
      const normalizedCountryCode = normalizeCountryCode(countryCode);
      const identifier = {
        type: 'phone' as const,
        value: buildFullPhone(normalizedCountryCode, phone),
        countryCode: normalizedCountryCode,
        phoneNumber: phone,
      };

      setIdentifier(identifier);
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

      setIdentifier(identifier);
      navigation.navigate('AuthOtp', {
        identifierType: identifier.type,
        identifierValue: identifier.value,
      });
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

      <AuthPrimaryButton
        label="Продолжить"
        onPress={handleContinue}
        disabled={!canContinue}
      />
    </AuthScreenLayout>
  );
}
