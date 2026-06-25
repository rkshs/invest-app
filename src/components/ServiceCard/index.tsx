import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';

type ServiceCardProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
};

export function ServiceCard({ title, icon, onPress }: ServiceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.text} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 168,
    justifyContent: 'space-between',
  },
  iconWrap: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: spacing.sm,
  },
  button: {
    backgroundColor: colors.text,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});
