import { StyleSheet, Text, View } from 'react-native';

import {
  getPasswordStrengthLabel,
  getPasswordStrengthProgress,
  PasswordStrength,
} from '../../lib/validatePassword';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

type AuthPasswordStrengthProps = {
  strength: PasswordStrength;
};

function getStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return colors.red;
    case 'fair':
      return colors.textSecondary;
    case 'good':
      return colors.blue;
    case 'strong':
      return colors.green;
    case 'empty':
    default:
      return colors.borderSubtle;
  }
}

export function AuthPasswordStrength({ strength }: AuthPasswordStrengthProps) {
  if (strength === 'empty') {
    return null;
  }

  const progress = getPasswordStrengthProgress(strength);
  const label = getPasswordStrengthLabel(strength);
  const fillColor = getStrengthColor(strength);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.round(progress * 100)}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
      <Text style={styles.label}>Надёжность пароля: {label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  track: {
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSoft,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
  label: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
