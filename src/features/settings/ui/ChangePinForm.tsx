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

const PIN_LENGTH = 4;

type PinFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

function PinField({ label, value, onChangeText }: PinFieldProps) {
  const handleChange = (text: string) => {
    onChangeText(text.replace(/\D/g, '').slice(0, PIN_LENGTH));
  };

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder="••••"
        placeholderTextColor={colors.textMuted}
        style={[styles.input, Platform.OS === 'web' && webInputStyle]}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={PIN_LENGTH}
        accessibilityLabel={label}
      />
    </View>
  );
}

export function ChangePinForm() {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const canSave =
    currentPin.length === PIN_LENGTH &&
    newPin.length === PIN_LENGTH &&
    confirmPin.length === PIN_LENGTH;

  const handleSave = () => {
    if (newPin !== confirmPin) {
      setFeedback({ type: 'error', message: 'Пин-коды не совпадают' });
      return;
    }

    if (newPin === currentPin) {
      setFeedback({
        type: 'error',
        message: 'Новый пин-код должен отличаться от текущего',
      });
      return;
    }

    setFeedback({ type: 'success', message: 'Пин-код успешно изменён' });
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
  };

  const handleFieldChange =
    (setter: (value: string) => void) => (value: string) => {
      setFeedback(null);
      setter(value);
    };

  return (
    <View style={styles.form}>
      <PinField
        label="Текущий пин-код"
        value={currentPin}
        onChangeText={handleFieldChange(setCurrentPin)}
      />
      <PinField
        label="Новый пин-код"
        value={newPin}
        onChangeText={handleFieldChange(setNewPin)}
      />
      <PinField
        label="Повторите новый пин-код"
        value={confirmPin}
        onChangeText={handleFieldChange(setConfirmPin)}
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
        accessibilityLabel="Сохранить пин-код"
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
    letterSpacing: 4,
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
