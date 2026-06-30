import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../shared/theme';
import {
  BOTTOM_SCROLL_FADE_HEIGHT,
  BottomScrollFadeContent,
} from '../BottomScrollFade';

type HomeBottomBarProps = {
  unreadCount?: number;
  onChatPress?: () => void;
};

const BUTTON_PADDING_Y = spacing.sm + 4;
const BUTTON_LINE_HEIGHT = typography.fontSize.sm + 5;

export function getHomeBottomBarHeight(insetsBottom: number): number {
  const buttonHeight = BUTTON_PADDING_Y * 2 + BUTTON_LINE_HEIGHT;

  return spacing.md + buttonHeight + Math.max(insetsBottom, spacing.md);
}

export function useHomeBottomBarHeight(): number {
  const insets = useSafeAreaInsets();

  return getHomeBottomBarHeight(insets.bottom);
}

function formatUnreadCount(count: number): string {
  if (count > 99) {
    return '99+';
  }

  return String(count);
}

export function HomeBottomBar({ unreadCount = 0, onChatPress }: HomeBottomBarProps) {
  const insets = useSafeAreaInsets();
  const hasUnread = unreadCount > 0;
  const unreadLabel = hasUnread
    ? `, ${unreadCount} непрочитанных сообщений`
    : '';

  return (
    <View style={styles.wrapper}>
      <View pointerEvents="none" style={styles.fadeHost}>
        <BottomScrollFadeContent />
      </View>

      <View
        style={[
          styles.actions,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Чат${unreadLabel}`}
          onPress={onChatPress}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Чат</Text>

          {hasUnread ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {formatUnreadCount(unreadCount)}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

export { BOTTOM_SCROLL_FADE_HEIGHT as homeBottomFadeHeight };

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: colors.background,
  },
  fadeHost: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -BOTTOM_SCROLL_FADE_HEIGHT,
    height: BOTTOM_SCROLL_FADE_HEIGHT,
    zIndex: 1,
  },
  actions: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: radius.md,
    paddingVertical: BUTTON_PADDING_Y,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.white,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 25,
    height: 25,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xs + 2,
    backgroundColor: colors.purple,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 14,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});
