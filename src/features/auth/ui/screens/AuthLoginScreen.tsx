import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import { authenticateWithBiometric } from '../../lib/biometricAuth';
import {
  formatLoginIdentifierInput,
  parseLoginIdentifierInput,
} from '../../lib/loginIdentifier';
import { getLoginMethodAvailability } from '../../lib/loginMethods';
import { useCompleteAuthLogin } from '../../model/useCompleteAuthLogin';
import { useAuthFlow } from '../../model/AuthFlowContext';
import {
  useLoginMutation,
  useQuickBiometricLoginMutation,
} from '../../model/useAuthMutations';
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
  const completeAuthLogin = useCompleteAuthLogin();
  const { identifier, pinDraft, biometricEnabled, setIdentifier, setLoginToken } =
    useAuthFlow();
  const loginMutation = useLoginMutation();
  const quickBiometricLoginMutation = useQuickBiometricLoginMutation();
  const [identifierInput, setIdentifierInput] = useState(() =>
    formatLoginIdentifierInput(identifier),
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

  useEffect(() => {
    setIdentifierInput(formatLoginIdentifierInput(identifier));
  }, [identifier]);

  const parsedIdentifier = useMemo(
    () => parseLoginIdentifierInput(identifierInput),
    [identifierInput],
  );

  const { canUsePin, canUseBiometric } = useMemo(
    () =>
      getLoginMethodAvailability(parsedIdentifier?.value ?? null, {
        pinDraft,
        biometricEnabled,
      }),
    [biometricEnabled, parsedIdentifier?.value, pinDraft],
  );

  const canLogin = password.length > 0 && Boolean(parsedIdentifier);

  const resolveIdentifierForLogin = () => {
    const parsed = parseLoginIdentifierInput(identifierInput);

    if (!parsed) {
      setError('Введите корректный телефон или email');
      return null;
    }

    setIdentifier(parsed);
    return parsed;
  };

  const handleLogin = async () => {
    setError('');

    const activeIdentifier = resolveIdentifierForLogin();

    if (!activeIdentifier) {
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        identifier: activeIdentifier,
        password,
      });
      setLoginToken(response.loginToken);
      navigation.navigate('AuthSecondFactor');
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось войти'));
    }
  };

  const handleBiometricLogin = async () => {
    const activeIdentifier = resolveIdentifierForLogin();

    if (!activeIdentifier) {
      return;
    }

    setError('');
    setIsBiometricLoading(true);

    const success = await authenticateWithBiometric('Подтвердите вход');

    if (!success) {
      setIsBiometricLoading(false);
      setError('Не удалось войти по биометрии');
      return;
    }

    try {
      const response = await quickBiometricLoginMutation.mutateAsync({
        identifierValue: activeIdentifier.value,
      });
      completeAuthLogin(response);
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось войти по биометрии'));
    } finally {
      setIsBiometricLoading(false);
    }
  };

  const handlePinLogin = () => {
    const activeIdentifier = resolveIdentifierForLogin();

    if (!activeIdentifier) {
      return;
    }

    if (!canUsePin) {
      setError('Пин-код не настроен для этого аккаунта');
      return;
    }

    setError('');
    navigation.navigate('AuthLoginPin');
  };

  return (
    <AuthScreenLayout title="Добро пожаловать">
      <View style={styles.form}>
        <AuthTextInput
          label="Телефон или email"
          value={identifierInput}
          onChangeText={(value) => {
            setError('');
            setIdentifierInput(value);
          }}
          placeholder="Телефон или email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          autoComplete="username"
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
            onPress={() => {
              const activeIdentifier = resolveIdentifierForLogin();

              if (!activeIdentifier) {
                return;
              }

              navigation.navigate('AuthRecoveryMethod');
            }}
          />
        </View>

        <AuthPrimaryButton
          label="Войти"
          onPress={handleLogin}
          disabled={!canLogin}
          loading={loginMutation.isPending}
        />

        <AuthSeparator label="или войти через" />

        <AuthActionRow
          left={
            <AuthSecondaryButton
              label="Пин-код"
              onPress={handlePinLogin}
              disabled={!canUsePin}
            />
          }
          right={
            <AuthSecondaryButton
              label="Биометрия"
              iconName="finger-print"
              onPress={handleBiometricLogin}
              disabled={!canUseBiometric}
              loading={isBiometricLoading || quickBiometricLoginMutation.isPending}
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
