import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getTickerAppearance } from '../../shared/lib/getTickerAppearance';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { Chat } from '../../types/chat';

type ChatDetailHeaderProps = {
  chat: Chat;
  onBackPress?: () => void;
};

const AVATAR_SIZE = 36;

export function ChatDetailHeader({ chat, onBackPress }: ChatDetailHeaderProps) {
  const insets = useSafeAreaInsets();
  const avatar = getTickerAppearance(chat.avatarSeed);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
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

      <View
        style={[styles.avatar, { backgroundColor: avatar.backgroundColor }]}
      >
        <Text style={[styles.avatarLabel, { color: avatar.color }]}>
          {avatar.label}
        </Text>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {chat.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
  },
  title: {
    flex: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  pressed: {
    opacity: 0.75,
  },
});
