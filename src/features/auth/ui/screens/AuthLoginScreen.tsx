import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { authenticateWithBiometric } from '../../lib/biometricAuth';
import { formatIdentifierForBadge } from '../../lib/otp';
import { verifyLoginPassword } from '../../lib/verifyLogin';
import { useAuth } from '../../model/AuthContext';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { AuthActionRow } from '../components/AuthActionRow';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthSecondaryButton } from '../components/AuthSecondaryButton';
import { AuthSeparator } from '../components/AuthSeparator';
import { AuthTextInput } from '../components/AuthTextInput';
import { AuthTextLink } from '../components/AuthTextLink';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { spacing } from '../../../../shared/theme';

type AuthLoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'AuthLogin'>;

export function AuthLoginScreen() {
  const navigation = useNavigation<AuthLoginNavigationProp>();
  const { loginAsClient } = useAuth();
  const { identifier, passwordDraft, pinDraft, biometricEnabled } = useAuthFlow();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

  const identifierLabel = useMemo(() => {
    if (!identifier) {
      return '';
    }

    return formatIdentifierForBadge(
      identifier.type,
      identifier.value,
      identifier.phoneNumber,
      identifier.countryCode,
    );
  }, [identifier]);

  const canLogin = password.length > 0 && Boolean(identifier);

  const handleLogin = async () => {
    setError('');

    if (!identifier) {
      navigation.navigate('AuthIdentifier');
      return;
    }

    if (!verifyLoginPassword(password, passwordDraft)) {
      setError('Неверный пароль');
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });

    setIsSubmitting(false);
    navigation.navigate('AuthSecondFactor');
  };

  const handleBiometricLogin = async () => {
    setError('');
    setIsBiometricLoading(true);

    const success = await authenticateWithBiometric();

    setIsBiometricLoading(false);

    if (!success) {
      setError('Не удалось войти по биометрии');
      return;
    }

    loginAsClient();
  };

  const handlePinLogin = () => {
    if (!pinDraft) {
      setError('Пин-код не настроен');
      return;
    }

    navigation.navigate('AuthLoginPin');
  };

  return (
    <AuthScreenLayout title="Добро пожаловать">
      <View style={styles.form}>
        <AuthTextInput
          label="Телефон или email"
          value={identifierLabel}
          onChangeText={() => undefined}
          editable={false}
          placeholder="Телефон или email"
        />

        <AuthTextInput
          label="Пароль"
          value={password}
          onChangeText={(value) => {
            setError('');
            setPassword(value);
          }}
          placeholder="Введите пароль"
          secureTextEntry
          textContentType="password"
          autoComplete="current-password"
          error={error}
        />

        <View style={styles.forgotPasswordRow}>
          <AuthTextLink
            label="Забыл пароль?"
            onPress={() => navigation.navigate('AuthRecoveryMethod')}
          />
        </View>

        <AuthPrimaryButton
          label="Войти"
          onPress={handleLogin}
          disabled={!canLogin}
          loading={isSubmitting}
        />

        <AuthSeparator label="или войти через" />

        <AuthActionRow
          left={
            <AuthSecondaryButton
              label="Пин-код"
              onPress={handlePinLogin}
              disabled={!pinDraft}
            />
          }
          right={
            <AuthSecondaryButton
              label="Биометрия"
              iconName="finger-print"
              onPress={handleBiometricLogin}
              disabled={!biometricEnabled}
              loading={isBiometricLoading}
            />
          }
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
  forgotPasswordRow: {
    alignItems: 'flex-end',
  },
});
