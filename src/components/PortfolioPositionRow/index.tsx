import { StyleSheet, Text, View } from 'react-native';

import {
  formatCashPositionMeta,
  formatPortfolioMoney,
  formatPortfolioPositionMeta,
} from '../../shared/lib/formatFinance';
import {
  isPurchasedCurrency,
  toPortfolioCurrency,
} from '../../shared/lib/convertPortfolioCurrency';
import { getCurrencyAppearance } from '../../shared/lib/getCurrencyAppearance';
import { getSecurityTypeLabel } from '../../shared/lib/getSecurityTypeLabel';
import { getTickerAppearance } from '../../shared/lib/getTickerAppearance';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { PortfolioRowData } from '../../types/portfolioRow';

type PortfolioPositionRowProps = {
  item: PortfolioRowData;
  isLast?: boolean;
};

const LOGO_SIZE = 36;

export function PortfolioPositionRow({ item, isLast = false }: PortfolioPositionRowProps) {
  const isCash = item.kind === 'cash';
  const valueCurrency = isCash
    ? item.currencyCode ?? 'USD'
    : toPortfolioCurrency(item.currencyCode);
  const metaCurrency = isCash && isPurchasedCurrency(item.currencyCode ?? '')
    ? item.currencyCode
    : valueCurrency;
  const appearance = isCash
    ? getCurrencyAppearance(item.ticker)
    : getTickerAppearance(item.ticker);

  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View
        style={[
          styles.logo,
          { backgroundColor: appearance.backgroundColor },
        ]}
      >
        <Text style={[styles.logoText, { color: appearance.color }]}>
          {appearance.label}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        {isCash ? (
          <Text style={styles.detail}>
            {formatCashPositionMeta(item.portfolioShare, metaCurrency ?? 'USD')}
          </Text>
        ) : (
          <>
            <Text style={styles.detail}>
              {item.ticker} · {item.isin}
            </Text>
            {item.securityType ? (
              <Text style={styles.detail}>
                {getSecurityTypeLabel(item.securityType)}
              </Text>
            ) : null}
            <Text style={styles.detail}>
              {formatPortfolioPositionMeta(
                item.quantity,
                item.portfolioShare,
                valueCurrency,
              )}
            </Text>
          </>
        )}
      </View>

      <Text style={styles.value}>
        {formatPortfolioMoney(item.totalValue, valueCurrency)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
  },
  content: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: spacing.sm + 4,
    gap: spacing.xs,
  },
  name: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    lineHeight: typography.fontSize.sm + 7,
    color: colors.text,
  },
  detail: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    lineHeight: typography.fontSize.sm + 7,
    color: colors.text,
    textAlign: 'right',
    flexShrink: 0,
  },
});
