import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../shared/theme';
import {
  BOTTOM_SCROLL_FADE_HEIGHT,
  BottomScrollFadeContent,
} from '../BottomScrollFade';

type HomeBottomBarProps = {
  onMarketsPress?: () => void;
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

export function HomeBottomBar({ onMarketsPress, onChatPress }: HomeBottomBarProps) {
  const insets = useSafeAreaInsets();

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
          accessibilityLabel="Рынки"
          onPress={onMarketsPress}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Рынки</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Чат"
          onPress={onChatPress}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Чат</Text>
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
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  button: {
    flex: 1,
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
  pressed: {
    opacity: 0.85,
  },
});
