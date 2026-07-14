import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import { getAuthErrorMessage } from '../../api/errors';
import {
  getPasswordRequirements,
  getPasswordStrength,
  isPasswordValid,
  passwordsMatch,
} from '../../lib/validatePassword';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useResetPasswordMutation } from '../../model/useAuthMutations';
import { AuthPasswordRequirements } from '../components/AuthPasswordRequirements';
import { AuthPasswordStrength } from '../components/AuthPasswordStrength';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthTextInput } from '../components/AuthTextInput';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthResetPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthResetPassword'
>;

export function AuthResetPasswordScreen() {
  const navigation = useNavigation<AuthResetPasswordNavigationProp>();
  const { setPasswordDraft, verificationToken, clearAuthSession } = useAuthFlow();
  const resetPasswordMutation = useResetPasswordMutation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const requirements = useMemo(
    () => getPasswordRequirements(password),
    [password],
  );
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordIsValid = isPasswordValid(password);
  const confirmIsValid = passwordsMatch(password, confirmPassword);
  const canSave = passwordIsValid && confirmIsValid;

  const confirmError = useMemo(() => {
    if (!submitted || !confirmPassword || confirmIsValid) {
      return undefined;
    }

    return 'Пароли не совпадают';
  }, [confirmIsValid, confirmPassword, submitted]);

  const handleSave = async () => {
    setSubmitted(true);
    setError('');

    if (!canSave) {
      return;
    }

    if (!verificationToken) {
      setError('Сессия восстановления не найдена');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        verificationToken,
        password,
      });
      setPasswordDraft(password);
      clearAuthSession();
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthLogin' }],
      });
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось сохранить пароль'));
    }
  };

  return (
    <AuthScreenLayout
      title="Новый пароль"
      subtitle="Придумайте новый пароль для входа"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
    >
      <View style={styles.form}>
        <AuthTextInput
          label="Новый пароль"
          value={password}
          onChangeText={(value) => {
            setSubmitted(false);
            setPassword(value);
          }}
          placeholder="Введите пароль"
          secureTextEntry
          textContentType="newPassword"
          autoComplete="new-password"
        />

        <AuthTextInput
          label="Повторите пароль"
          value={confirmPassword}
          onChangeText={(value) => {
            setSubmitted(false);
            setConfirmPassword(value);
          }}
          placeholder="Повторите пароль"
          secureTextEntry
          textContentType="newPassword"
          autoComplete="new-password"
          error={confirmError}
        />

        <AuthPasswordStrength strength={strength} />
        <AuthPasswordRequirements requirements={requirements} />

        {submitted && !passwordIsValid ? (
          <Text style={styles.error}>Пароль не соответствует требованиям</Text>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthPrimaryButton
          label="Сохранить пароль"
          onPress={handleSave}
          disabled={!canSave}
          loading={resetPasswordMutation.isPending}
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
});
