import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { authInputWebStyle, isAuthInputWeb } from '../../lib/authInputStyle';
import { formatPhoneForDisplay } from '../../lib/validateIdentifier';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

type AuthPhoneInputProps = {
  countryCode: string;
  phone: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  disabled?: boolean;
  countryCodeError?: string;
  phoneError?: string;
  onFocus?: () => void;
};

export function AuthPhoneInput({
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  disabled = false,
  countryCodeError,
  phoneError,
  onFocus,
}: AuthPhoneInputProps) {
  const [focusedField, setFocusedField] = useState<'countryCode' | 'phone' | null>(
    null,
  );
  const hasError = Boolean(countryCodeError || phoneError);

  const handleCountryCodeChange = (value: string) => {
    const sanitized = value.replace(/[^\d+]/g, '').slice(0, 5);
    onCountryCodeChange(sanitized);
  };

  const handlePhoneChange = (value: string) => {
    onPhoneChange(formatPhoneForDisplay(value));
  };

  const getInputStyle = (field: 'countryCode' | 'phone') => {
    const isFocused = focusedField === field;

    return [
      styles.input,
      isFocused && !hasError && styles.inputFocused,
      hasError && styles.inputError,
      disabled && styles.inputDisabled,
      isAuthInputWeb && authInputWebStyle,
    ];
  };

  const bindFocusHandlers = (field: 'countryCode' | 'phone'): Partial<TextInputProps> => ({
    onFocus: () => {
      setFocusedField(field);
      onFocus?.();
    },
    onBlur: () => {
      setFocusedField((current) => (current === field ? null : current));
    },
  });

  return (
    <View style={styles.field}>
      <View style={styles.row}>
        <View style={styles.countryCodeColumn}>
          <Text style={styles.label}>Код страны</Text>
          <TextInput
            value={countryCode}
            onChangeText={handleCountryCodeChange}
            editable={!disabled}
            keyboardType="phone-pad"
            placeholder="+357"
            placeholderTextColor={colors.textMuted}
            style={[getInputStyle('countryCode'), styles.countryCodeInput]}
            accessibilityLabel="Код страны"
            autoCorrect={false}
            {...bindFocusHandlers('countryCode')}
          />
        </View>

        <View style={styles.phoneColumn}>
          <TextInput
            value={phone}
            onChangeText={handlePhoneChange}
            editable={!disabled}
            keyboardType="phone-pad"
            placeholder="99 100 200"
            placeholderTextColor={colors.textMuted}
            style={[getInputStyle('phone'), styles.phoneInput]}
            accessibilityLabel="Номер телефона"
            autoCorrect={false}
            {...bindFocusHandlers('phone')}
          />
        </View>
      </View>

      {countryCodeError ? <Text style={styles.error}>{countryCodeError}</Text> : null}
      {!countryCodeError && phoneError ? (
        <Text style={styles.error}>{phoneError}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  countryCodeColumn: {
    width: 108,
    gap: spacing.xs,
  },
  phoneColumn: {
    flex: 1,
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
  countryCodeInput: {
    textAlign: 'center',
  },
  phoneInput: {
    marginTop: spacing.lg,
  },
  inputFocused: {
    borderColor: colors.blue,
  },
  inputError: {
    borderColor: colors.red,
  },
  inputDisabled: {
    opacity: 0.45,
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.red,
  },
});
