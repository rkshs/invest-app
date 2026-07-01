import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';
import { PortfolioDisplayCurrency } from '../../shared/lib/convertPortfolioCurrency';

type PortfolioCurrencyToggleProps = {
  selectedCurrency: PortfolioDisplayCurrency;
  onSelect: (currency: PortfolioDisplayCurrency) => void;
};

const CURRENCIES: PortfolioDisplayCurrency[] = ['USD', 'EUR'];

export function PortfolioCurrencyToggle({
  selectedCurrency,
  onSelect,
}: PortfolioCurrencyToggleProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Валюта портфеля</Text>

      <View style={styles.toggleRow}>
        {CURRENCIES.map((currency) => {
          const isSelected = currency === selectedCurrency;

          return (
            <Pressable
              key={currency}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Валюта ${currency}`}
              onPress={() => onSelect(currency)}
              style={({ pressed }) => [
                styles.pill,
                isSelected && styles.pillSelected,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  isSelected && styles.pillTextSelected,
                ]}
              >
                {currency}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pill: {
    minWidth: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  pillText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  pillTextSelected: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});
