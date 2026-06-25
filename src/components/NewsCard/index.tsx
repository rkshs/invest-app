import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';
import { ActualNewsItem } from '../../types/actualNews';

type NewsCardProps = {
  item: ActualNewsItem;
  width: number;
  onDismiss?: (id: string) => void;
  onPress?: (id: string) => void;
};

export function NewsCard({ item, width, onDismiss, onPress }: NewsCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(item.id)}
      style={({ pressed }) => [
        styles.card,
        { width },
        pressed && styles.pressed,
      ]}
    >
      {item.dismissible ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Закрыть"
          hitSlop={8}
          onPress={(event) => {
            event.stopPropagation();
            onDismiss?.(item.id);
          }}
          style={styles.dismissButton}
        >
          <Ionicons name="close" size={18} color={colors.textSecondary} />
        </Pressable>
      ) : null}

      {item.variant === 'article' ? (
        <Text style={styles.articleTitle}>{item.title}</Text>
      ) : (
        <View style={styles.ideaContent}>
          {item.subtitle ? (
            <Text style={styles.ideaSubtitle}>{item.subtitle}</Text>
          ) : null}
          <Text style={styles.ideaTitle}>{item.title}</Text>
          {item.highlight ? (
            <Text style={styles.ideaHighlight}>{item.highlight}</Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(8, 21, 12, 0.05)',
    padding: spacing.md,
    minHeight: 148,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  dismissButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 1,
  },
  articleTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
    lineHeight: 22,
    paddingRight: spacing.lg,
  },
  ideaContent: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  ideaSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  ideaTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  ideaHighlight: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.green,
  },
});
