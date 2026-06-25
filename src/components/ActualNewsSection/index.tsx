import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';
import { ActualNewsItem } from '../../types/actualNews';
import { NewsCard } from '../NewsCard';

type ActualNewsSectionProps = {
  items: ActualNewsItem[];
  onSeeAllPress?: () => void;
  onItemPress?: (id: string) => void;
  onDismiss?: (id: string) => void;
};

const CARD_GAP = spacing.sm;
const CARD_PEEK = 48;

export function ActualNewsSection({
  items,
  onSeeAllPress,
  onItemPress,
  onDismiss,
}: ActualNewsSectionProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - spacing.xl * 2 - CARD_PEEK;

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Актуальное</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Все новости"
          hitSlop={8}
          onPress={onSeeAllPress}
          style={({ pressed }) => [styles.seeAllButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + CARD_GAP}
        snapToAlignment="start"
        disableIntervalMomentum
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            width={cardWidth}
            onDismiss={onDismiss}
            onPress={onItemPress}
          />
        )}
        ItemSeparatorComponent={CardSeparator}
      />
    </View>
  );
}

function CardSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  section: {
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
  seeAllButton: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.xl,
  },
  separator: {
    width: CARD_GAP,
  },
  pressed: {
    opacity: 0.75,
  },
});
