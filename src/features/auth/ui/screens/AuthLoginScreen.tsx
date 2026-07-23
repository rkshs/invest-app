import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import { AUTH_API_MODE } from '../../config';
import { authenticateWithBiometric, LOGIN_BIOMETRIC_OPTIONS } from '../../lib/biometricAuth';
import { openBiometricSettings, resolveBiometricErrorAction } from '../../lib/biometricErrorPresenter';
import {
  formatLoginIdentifierInput,
  parseLoginIdentifierInput,
} from '../../lib/loginIdentifier';
import { getLoginMethodAvailability } from '../../lib/loginMethods';
import { getSecureLoginToken } from '../../lib/secureLoginToken';
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
  const {
    identifier,
    pinDraft,
    biometricEnabled,
    setIdentifier,
    setLoginToken,
    resetBiometricAfterInvalidation,
  } = useAuthFlow();
  const loginMutation = useLoginMutation();
  const quickBiometricLoginMutation = useQuickBiometricLoginMutation();
  const [identifierInput, setIdentifierInput] = useState(() =>
    formatLoginIdentifierInput(identifier),
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [showBiometricSettingsLink, setShowBiometricSettingsLink] = useState(false);

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
    setShowBiometricSettingsLink(false);
    setIsBiometricLoading(true);

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
    } else {
      // Prod-режим: сам факт получения токена из SecureStore (requireAuthentication)
      // и есть биометрическая проверка на уровне ОС — отдельный вызов
      // authenticateWithBiometric здесь не нужен (не показываем диалог дважды).
      const secureResult = await getSecureLoginToken();

      if (secureResult.status === 'invalidated') {
        resetBiometricAfterInvalidation();
        setIsBiometricLoading(false);
        setError('Биометрия на устройстве изменилась. Войдите с паролем.');
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

      // TODO: когда apiAuthService будет реализован — передавать
      // secureResult.token на сервер вместе с identifierValue для валидации.
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

        {showBiometricSettingsLink ? (
          <AuthTextLink label="Открыть настройки" onPress={openBiometricSettings} />
        ) : null}
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
