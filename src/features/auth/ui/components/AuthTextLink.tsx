import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, typography } from '../../../../shared/theme';

type AuthTextLinkProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function AuthTextLink({ label, onPress, disabled = false }: AuthTextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.blue,
    textAlign: 'center',
  },
  labelDisabled: {
    color: colors.textMuted,
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.75,
  },
});
