import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { authInputWebStyle, isAuthInputWeb } from '../../lib/authInputStyle';
import { sanitizePasswordInput } from '../../../../shared/lib/sanitizePasswordInput';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

type AuthTextInputProps = {
  label?: string;
  error?: string;
  containerStyle?: TextInputProps['style'];
} & Pick<
  TextInputProps,
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'accessibilityLabel'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'secureTextEntry'
  | 'editable'
  | 'onFocus'
  | 'onBlur'
  | 'textContentType'
  | 'autoComplete'
  | 'maxLength'
  | 'returnKeyType'
  | 'onSubmitEditing'
>;

export function AuthTextInput({
  label,
  error,
  containerStyle,
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  keyboardType,
  autoCapitalize = 'none',
  autoCorrect = false,
  secureTextEntry,
  editable = true,
  onFocus,
  onBlur,
  textContentType,
  autoComplete,
  maxLength,
  returnKeyType,
  onSubmitEditing,
}: AuthTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);
  const showActiveBorder = isFocused && !hasError;

  const handleFocus: TextInputProps['onFocus'] = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur: TextInputProps['onBlur'] = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChangeText = (text: string) => {
    const nextValue = secureTextEntry ? sanitizePasswordInput(text) : text;
    onChangeText?.(nextValue);
  };

  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          showActiveBorder && styles.inputFocused,
          hasError && styles.inputError,
          !editable && styles.inputDisabled,
          isAuthInputWeb && authInputWebStyle,
          containerStyle,
        ]}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textContentType={textContentType}
        autoComplete={autoComplete}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        accessibilityLabel={accessibilityLabel ?? label}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  input: {
    minHeight: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.blue,
  },
  inputError: {
    borderColor: colors.red,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.red,
  },
});
