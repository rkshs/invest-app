import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../../shared/theme';

type AuthSeparatorProps = {
  label?: string;
};

export function AuthSeparator({ label = 'или' }: AuthSeparatorProps) {
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={label}
      style={styles.container}
    >
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  label: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
