import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../shared/theme';

type SettingsMenuRowProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  isLast?: boolean;
};

export function SettingsMenuRow({
  title,
  icon,
  onPress,
  isLast = false,
}: SettingsMenuRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        isLast && styles.rowLast,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={colors.blue} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
