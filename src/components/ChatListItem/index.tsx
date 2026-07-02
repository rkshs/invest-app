import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getTickerAppearance } from '../../shared/lib/getTickerAppearance';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { Chat } from '../../types/chat';

type ChatListItemProps = {
  chat: Chat;
  title?: string;
  onPress?: (chat: Chat) => void;
};

const AVATAR_SIZE = 52;

function formatPreview(chat: Chat): string {
  if (chat.lastMessagePrefix) {
    return `${chat.lastMessagePrefix}: ${chat.lastMessage}`;
  }

  return chat.lastMessage;
}

export function ChatListItem({ chat, title, onPress }: ChatListItemProps) {
  const avatar = getTickerAppearance(chat.avatarSeed);
  const preview = formatPreview(chat);
  const displayTitle = title ?? chat.title;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={displayTitle}
      onPress={() => onPress?.(chat)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View
        style={[styles.avatar, { backgroundColor: avatar.backgroundColor }]}
      >
        <Text style={[styles.avatarLabel, { color: avatar.color }]}>
          {avatar.label}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>

          {chat.unreadCount ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.75,
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
    fontSize: typography.fontSize.sm,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  timestamp: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  preview: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm + 6,
    color: colors.textSecondary,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xs + 2,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: colors.white,
  },
});
