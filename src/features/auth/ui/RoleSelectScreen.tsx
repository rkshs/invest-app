import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../model/AuthContext';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type RoleOptionProps = {
  title: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
};

function RoleOption({ title, description, icon, onPress }: RoleOptionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.pressed]}
    >
      <View style={styles.optionIconWrap}>
        <Ionicons name={icon} size={24} color={colors.blue} />
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}

export function RoleSelectScreen() {
  const insets = useSafeAreaInsets();
  const { loginAsClient, loginAsTrader } = useAuth();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.xl,
          paddingBottom: insets.bottom + spacing.xl,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Invest App</Text>
        <Text style={styles.subtitle}>Выберите тип входа</Text>
      </View>

      <View style={styles.options}>
        <RoleOption
          title="Вход клиента"
          description="Портфель, счета и чат с поддержкой"
          icon="person-outline"
          onPress={loginAsClient}
        />
        <RoleOption
          title="Вход трейдера"
          description="Рабочее место для обслуживания клиентов"
          icon="briefcase-outline"
          onPress={loginAsTrader}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  optionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
    gap: spacing.xs,
  },
  optionTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  optionDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  pressed: {
    opacity: 0.85,
  },
});
