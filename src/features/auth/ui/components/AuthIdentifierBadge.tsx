import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../../shared/theme';

type AuthIdentifierBadgeProps = {
  label: string;
};

export function AuthIdentifierBadge({ label }: AuthIdentifierBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    maxWidth: '100%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
  },
});
