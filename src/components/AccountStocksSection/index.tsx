import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  mapAccountCurrencyToPortfolioRow,
  mapAccountPositionToPortfolioRow,
} from '../../shared/lib/mapPortfolioRow';
import { formatMoney } from '../../shared/lib/formatFinance';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { AccountCurrency } from '../../types/accountCurrency';
import { AccountPosition } from '../../types/accountPosition';
import { PortfolioPositionRow } from '../PortfolioPositionRow';

type AccountStocksSectionProps = {
  positions: AccountPosition[];
  currencies: AccountCurrency[];
  totalValue: number;
  totalChange: number;
  portfolioTotalValue: number;
};

export function AccountStocksSection({
  positions,
  currencies,
  totalValue,
  totalChange,
  portfolioTotalValue,
}: AccountStocksSectionProps) {
  const [expanded, setExpanded] = useState(true);

  const rows = useMemo(
    () => [
      ...positions.map((position) =>
        mapAccountPositionToPortfolioRow(position, portfolioTotalValue),
      ),
      ...currencies.map((currency) =>
        mapAccountCurrencyToPortfolioRow(currency, portfolioTotalValue),
      ),
    ],
    [currencies, portfolioTotalValue, positions],
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel="Акции"
        onPress={() => setExpanded((current) => !current)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Акции</Text>
          <Text style={styles.summaryLine}>
            <Text style={styles.summaryValue}>{formatMoney(totalValue)}</Text>
            <Text style={styles.summaryChange}> • {formatMoney(totalChange)}</Text>
          </Text>
        </View>

        <View style={styles.toggleButton}>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.text}
          />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.list}>
          {rows.map((item, index) => (
            <PortfolioPositionRow
              key={item.id}
              item={item}
              isLast={index === rows.length - 1}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  summaryLine: {
    marginTop: spacing.xs,
  },
  summaryValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  summaryChange: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  toggleButton: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
});
