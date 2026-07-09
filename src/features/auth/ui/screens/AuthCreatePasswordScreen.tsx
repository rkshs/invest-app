import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthStackParamList } from '../../../../app/navigation';
import {
  getPasswordRequirements,
  getPasswordStrength,
  isPasswordValid,
  passwordsMatch,
} from '../../lib/validatePassword';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { AuthPasswordRequirements } from '../components/AuthPasswordRequirements';
import { AuthPasswordStrength } from '../components/AuthPasswordStrength';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthTextInput } from '../components/AuthTextInput';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthCreatePasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthCreatePassword'
>;

export function AuthCreatePasswordScreen() {
  const navigation = useNavigation<AuthCreatePasswordNavigationProp>();
  const { setPasswordDraft } = useAuthFlow();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!canSave) {
      return;
    }

    setIsSubmitting(true);
    setPasswordDraft(password);

    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });

    setIsSubmitting(false);
    navigation.navigate('AuthPinCode');
  };

  return (
    <AuthScreenLayout
      title="Создание пароля"
      subtitle="Придумайте надёжный пароль"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
    >
      <View style={styles.form}>
        <AuthTextInput
          label="Пароль"
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

        <AuthPrimaryButton
          label="Сохранить пароль"
          onPress={handleSave}
          disabled={!canSave}
          loading={isSubmitting}
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
