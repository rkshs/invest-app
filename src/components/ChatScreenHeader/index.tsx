import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../shared/theme';

type ChatScreenHeaderProps = {
  onBackPress?: () => void;
  onProfilePress?: () => void;
};

const ICON_BUTTON_SIZE = 44;

export function ChatScreenHeader({
  onBackPress,
  onProfilePress,
}: ChatScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.xl,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Назад"
        hitSlop={8}
        onPress={onBackPress}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Ionicons name="chevron-back" size={24} color={colors.text} />
      </Pressable>

      <Text style={styles.title}>Чаты</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Профиль"
        onPress={onProfilePress}
        style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.blue} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
  profileButton: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
});
