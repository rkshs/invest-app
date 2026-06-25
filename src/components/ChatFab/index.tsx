import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../shared/theme';

type ChatFabProps = {
  onPress?: () => void;
  bottomInset?: number;
};

const FAB_SIZE = 56;

export function ChatFab({ onPress, bottomInset = 0 }: ChatFabProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Новый чат"
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        { bottom: Math.max(bottomInset, spacing.md) + spacing.lg },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="create-outline" size={24} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.xl,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  pressed: {
    opacity: 0.9,
  },
});
