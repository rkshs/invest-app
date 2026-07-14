import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../../shared/theme';
import { sanitizePasswordInput } from '../../../shared/lib/sanitizePasswordInput';

const MIN_PASSWORD_LENGTH = 8;

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

function PasswordField({ label, value, onChangeText }: PasswordFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(sanitizePasswordInput(text))}
        placeholder="Введите пароль"
        placeholderTextColor={colors.textMuted}
        style={[styles.input, Platform.OS === 'web' && webInputStyle]}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel={label}
      />
    </View>
  );
}

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const canSave =
    currentPassword.length >= MIN_PASSWORD_LENGTH &&
    newPassword.length >= MIN_PASSWORD_LENGTH &&
    confirmPassword.length >= MIN_PASSWORD_LENGTH;

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Пароли не совпадают' });
      return;
    }

    if (newPassword === currentPassword) {
      setFeedback({
        type: 'error',
        message: 'Новый пароль должен отличаться от текущего',
      });
      return;
    }

    setFeedback({ type: 'success', message: 'Пароль успешно изменён' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleFieldChange =
    (setter: (value: string) => void) => (value: string) => {
      setFeedback(null);
      setter(value);
    };

  return (
    <View style={styles.form}>
      <PasswordField
        label="Текущий пароль"
        value={currentPassword}
        onChangeText={handleFieldChange(setCurrentPassword)}
      />
      <PasswordField
        label="Новый пароль"
        value={newPassword}
        onChangeText={handleFieldChange(setNewPassword)}
      />
      <PasswordField
        label="Повторите новый пароль"
        value={confirmPassword}
        onChangeText={handleFieldChange(setConfirmPassword)}
      />

      {feedback ? (
        <Text
          style={[
            styles.feedback,
            feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess,
          ]}
        >
          {feedback.message}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Сохранить пароль"
        accessibilityState={{ disabled: !canSave }}
        disabled={!canSave}
        onPress={handleSave}
        style={({ pressed }) => [
          styles.saveButton,
          !canSave && styles.saveButtonDisabled,
          pressed && canSave && styles.pressed,
        ]}
      >
        <Text style={styles.saveButtonText}>Сохранить</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  input: {
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  feedback: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },
  feedbackError: {
    color: colors.red,
  },
  feedbackSuccess: {
    color: colors.green,
  },
  saveButton: {
    marginTop: spacing.xs,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.35,
  },
  saveButtonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});

const webInputStyle = {
  outlineStyle: 'none',
  outlineWidth: 0,
} as unknown as TextStyle;
