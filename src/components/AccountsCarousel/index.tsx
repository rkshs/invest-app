import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { PortfolioCard } from '../PortfolioCard';
import { colors, radius, shadows, spacing, typography, layout } from '../../shared/theme';
import { Account } from '../../types';

type AccountsCarouselProps = {
  accounts: Account[];
  onAccountPress?: (account: Account) => void;
  onOpenAccountPress?: () => void;
};

const CARD_PEEK = 56;
const CARD_GAP = spacing.sm;

export function AccountsCarousel({
  accounts,
  onAccountPress,
  onOpenAccountPress,
}: AccountsCarouselProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - spacing.md * 2 - CARD_PEEK;

  return (
    <FlatList
      horizontal
      data={accounts}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={cardWidth + CARD_GAP}
      snapToAlignment="start"
      disableIntervalMomentum
      contentContainerStyle={styles.content}
      ListFooterComponent={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Открыть счёт"
          onPress={onOpenAccountPress}
          style={({ pressed }) => [
            styles.openAccountCard,
            { width: cardWidth * 0.72 },
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.openAccountIcon}>
            <Ionicons name="add" size={24} color={colors.text} />
          </View>
          <Text style={styles.openAccountText}>Открыть{'\n'}счёт</Text>
        </Pressable>
      }
      renderItem={({ item }) => (
        <PortfolioCard
          accountNumber={item.number}
          balance={item.balance}
          changeFromZero={item.changeFromZero}
          changePercentFromZero={item.changePercentFromZero}
          width={cardWidth}
          onPress={() => onAccountPress?.(item)}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  separator: {
    width: CARD_GAP,
  },
  openAccountCard: {
    marginLeft: CARD_GAP,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    height: layout.accountCardHeight,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  openAccountIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openAccountText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
});
