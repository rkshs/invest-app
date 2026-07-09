import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../../../shared/theme';

type AuthNumericKeypadProps = {
  onDigitPress: (digit: string) => void;
  onBackspacePress: () => void;
};

const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['0'],
] as const;

export function AuthNumericKeypad({
  onDigitPress,
  onBackspacePress,
}: AuthNumericKeypadProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, spacing.md) },
      ]}
    >
      {KEYPAD_ROWS.map((row, rowIndex) => (
        <View key={`keypad-row-${rowIndex}`} style={styles.row}>
          {row.map((digit) => (
            <Pressable
              key={digit}
              accessibilityRole="button"
              accessibilityLabel={digit}
              onPress={() => onDigitPress(digit)}
              style={({ pressed }) => [
                styles.key,
                digit === '0' && styles.zeroKey,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.keyLabel}>{digit}</Text>
            </Pressable>
          ))}

          {rowIndex === KEYPAD_ROWS.length - 1 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Удалить символ"
              onPress={onBackspacePress}
              style={({ pressed }) => [styles.key, styles.backspaceKey, pressed && styles.pressed]}
            >
              <Ionicons name="backspace-outline" size={22} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  key: {
    width: 72,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  zeroKey: {
    flexGrow: 0,
  },
  backspaceKey: {
    backgroundColor: 'transparent',
  },
  keyLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
  pressed: {
    opacity: 0.75,
  },
});
