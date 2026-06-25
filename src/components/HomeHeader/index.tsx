import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../shared/theme';

type HomeHeaderProps = {
  onSettingsPress?: () => void;
  onProfilePress?: () => void;
};

const ICON_BUTTON_SIZE = 44;
const ANIMATION_DURATION = 280;

export function HomeHeader({ onSettingsPress, onProfilePress }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const progress = useSharedValue(0);

  const openSearch = () => {
    setIsSearchOpen(true);
    progress.value = withTiming(1, { duration: ANIMATION_DURATION });
  };

  const closeSearch = () => {
    progress.value = withTiming(0, { duration: ANIMATION_DURATION });
    setIsSearchOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, ANIMATION_DURATION);

    return () => clearTimeout(focusTimer);
  }, [isSearchOpen]);

  const searchContainerStyle = useAnimatedStyle(() => ({
    flex: progress.value,
    width: progress.value === 0 ? ICON_BUTTON_SIZE : undefined,
    minWidth: ICON_BUTTON_SIZE,
    marginRight: interpolate(progress.value, [0, 1], [0, spacing.md], Extrapolation.CLAMP),
  }));

  const searchIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.35], [1, 0], Extrapolation.CLAMP),
  }));

  const searchFieldStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.35, 1], [0, 1], Extrapolation.CLAMP),
  }));

  const spacerStyle = useAnimatedStyle(() => ({
    flex: interpolate(progress.value, [0, 1], [1, 0], Extrapolation.CLAMP),
  }));

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
        accessibilityLabel="Настройки"
        onPress={onSettingsPress}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Ionicons name="settings-outline" size={22} color={colors.text} />
      </Pressable>

      <Animated.View style={[styles.searchContainer, searchContainerStyle]}>
        <Animated.View style={[styles.searchIconLayer, searchIconStyle]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Поиск по бумагам"
            onPress={openSearch}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Ionicons name="search-outline" size={22} color={colors.text} />
          </Pressable>
        </Animated.View>

        <Animated.View
          pointerEvents={isSearchOpen ? 'auto' : 'none'}
          style={[styles.searchFieldLayer, searchFieldStyle]}
        >
          <View style={styles.searchField}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.searchFieldIcon}
            />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Поиск по бумагам"
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, Platform.OS === 'web' && webSearchInputStyle]}
              returnKeyType="search"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Закрыть поиск"
              hitSlop={8}
              onPress={closeSearch}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            >
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View style={spacerStyle} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Профиль"
        onPress={onProfilePress}
        style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.purple} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  iconButton: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchContainer: {
    height: ICON_BUTTON_SIZE,
    position: 'relative',
    marginLeft: spacing.sm,
  },
  searchIconLayer: {
    ...StyleSheet.absoluteFill,
  },
  searchFieldLayer: {
    ...StyleSheet.absoluteFill,
  },
  searchFieldIcon: {
    flexShrink: 0,
    marginRight: spacing.sm,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: ICON_BUTTON_SIZE,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    paddingVertical: 0,
    paddingRight: spacing.xs,
    borderWidth: 0,
  },
  closeButton: {
    flexShrink: 0,
    zIndex: 1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
  },
  profileButton: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.white,
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

const webSearchInputStyle = {
  outlineStyle: 'none',
  outlineWidth: 0,
  minWidth: 0,
} as unknown as TextStyle;
