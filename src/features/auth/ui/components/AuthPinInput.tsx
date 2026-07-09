import { useEffect, useRef } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { authInputWebStyle, isAuthInputWeb } from '../../lib/authInputStyle';
import { PIN_LENGTH, sanitizePinInput } from '../../lib/pin';
import { colors, radius, spacing } from '../../../../shared/theme';

const useNativeKeyboard = Platform.OS !== 'web';

type AuthPinInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AuthPinInput({ value, onChange }: AuthPinInputProps) {
  const inputRef = useRef<TextInput>(null);
  const filledLength = value.length;
  const activeIndex = Math.min(filledLength, PIN_LENGTH - 1);

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

  const handleDotPress = (index: number) => {
    if (useNativeKeyboard) {
      focusInput();
      return;
    }

    onChange(value.slice(0, index));
  };

  const handleTextChange = (text: string) => {
    onChange(sanitizePinInput(text));
  };

  return (
    <Pressable accessibilityRole="none" onPress={focusInput} style={styles.wrapper}>
      <View style={styles.container}>
        {Array.from({ length: PIN_LENGTH }, (_, index) => {
          const isFilled = index < filledLength;
          const isActive = index === activeIndex && filledLength < PIN_LENGTH;

          return (
            <Pressable
              key={`pin-dot-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Символ ${index + 1} из ${PIN_LENGTH}`}
              onPress={() => handleDotPress(index)}
              style={({ pressed }) => [
                styles.dot,
                isFilled && styles.dotFilled,
                isActive && styles.dotActive,
                pressed && styles.pressed,
              ]}
            />
          );
        })}
      </View>

      {useNativeKeyboard ? (
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="number-pad"
          maxLength={PIN_LENGTH}
          caretHidden
          secureTextEntry
          style={[styles.hiddenInput, isAuthInputWeb && authInputWebStyle]}
          accessibilityLabel="Пин-код"
        />
      ) : null}
    </Pressable>
  );
}

const DOT_SIZE = 16;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingVertical: spacing.md,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dotFilled: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  dotActive: {
    borderColor: colors.blue,
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
