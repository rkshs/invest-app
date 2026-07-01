import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, spacing, typography } from '../../shared/theme';

const CHEVRON_ROTATION_DURATION = 220;

type SettingsExpandableRowProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  expanded: boolean;
  onToggle: () => void;
  isLast?: boolean;
  children?: ReactNode;
};

export function SettingsExpandableRow({
  title,
  icon,
  expanded,
  onToggle,
  isLast = false,
  children,
}: SettingsExpandableRowProps) {
  const chevronRotation = useSharedValue(expanded ? 90 : 0);

  useEffect(() => {
    chevronRotation.value = withTiming(expanded ? 90 : 0, {
      duration: CHEVRON_ROTATION_DURATION,
    });
  }, [chevronRotation, expanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, isLast && styles.containerLast]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        onPress={onToggle}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={20} color={colors.blue} />
        </View>

        <Text style={styles.title}>{title}</Text>

        <Animated.View style={chevronStyle}>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </Animated.View>
      </Pressable>

      {expanded ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  containerLast: {
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
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
  content: {
    paddingBottom: spacing.md,
    paddingLeft: 36 + spacing.md,
  },
  pressed: {
    opacity: 0.85,
  },
});
