import { useEffect, useRef } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { authInputWebStyle, isAuthInputWeb } from '../../lib/authInputStyle';
import { OTP_LENGTH } from '../../lib/otp';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

const useNativeKeyboard = Platform.OS !== 'web';

type AuthOtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export function AuthOtpInput({ value, onChange, hasError = false }: AuthOtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = value.padEnd(OTP_LENGTH, ' ').slice(0, OTP_LENGTH).split('');
  const activeIndex = Math.min(value.length, OTP_LENGTH - 1);

  useEffect(() => {
    if (!useNativeKeyboard) {
      return;
    }

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(focusTimer);
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCellPress = (index: number) => {
    if (useNativeKeyboard) {
      focusInput();
      return;
    }

    onChange(value.slice(0, index));
  };

  const handleTextChange = (text: string) => {
    onChange(text.replace(/\D/g, '').slice(0, OTP_LENGTH));
  };

  return (
    <Pressable
      accessibilityRole="none"
      onPress={focusInput}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        {digits.map((digit, index) => {
          const isFilled = digit.trim().length > 0;
          const isActive = index === activeIndex && value.length < OTP_LENGTH;

          return (
            <Pressable
              key={`otp-cell-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Символ ${index + 1} из ${OTP_LENGTH}`}
              onPress={() => handleCellPress(index)}
              style={({ pressed }) => [
                styles.cell,
                isFilled && styles.cellFilled,
                isActive && !hasError && styles.cellActive,
                hasError && styles.cellError,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.digit}>{isFilled ? digit : ''}</Text>
            </Pressable>
          );
        })}
      </View>

      {useNativeKeyboard ? (
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          maxLength={OTP_LENGTH}
          caretHidden
          importantForAutofill="yes"
          style={[styles.hiddenInput, isAuthInputWeb && authInputWebStyle]}
          accessibilityLabel="Код подтверждения"
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  cell: {
    width: 44,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    borderColor: colors.border,
  },
  cellActive: {
    borderColor: colors.blue,
  },
  cellError: {
    borderColor: colors.red,
  },
  digit: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  pressed: {
    opacity: 0.85,
  },
});
