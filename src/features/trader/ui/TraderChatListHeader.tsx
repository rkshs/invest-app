import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../../shared/theme';

type TraderChatListHeaderProps = {
  onSettingsPress?: () => void;
};

const ICON_BUTTON_SIZE = 44;

export function TraderChatListHeader({ onSettingsPress }: TraderChatListHeaderProps) {
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
      <Text style={styles.title}>Чаты</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Настройки"
        onPress={onSettingsPress}
        style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
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
  title: {
    flex: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
  settingsButton: {
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
