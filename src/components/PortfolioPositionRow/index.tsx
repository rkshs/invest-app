import { StyleSheet, Text, View } from 'react-native';

import {
  formatCashPositionMeta,
  formatPercent,
  formatPortfolioMoney,
  formatPortfolioShare,
  formatSecurityPositionMeta,
  getPortfolioChangeColor,
} from '../../shared/lib/formatFinance';
import { toPortfolioCurrency } from '../../shared/lib/convertPortfolioCurrency';
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
  const valueCurrency = toPortfolioCurrency(item.currencyCode);
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
            {formatCashPositionMeta(item.quantity, item.portfolioShare, item.ticker)}
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
              {formatSecurityPositionMeta(
                item.quantity,
                item.unitPrice ?? 0,
                valueCurrency,
              )}
            </Text>
          </>
        )}
      </View>

      <View style={styles.valueColumn}>
        <Text style={styles.value}>
          {formatPortfolioMoney(item.totalValue, valueCurrency)}
        </Text>
        {!isCash && item.changePercent != null ? (
          <Text
            style={[
              styles.change,
              { color: getPortfolioChangeColor(item.changePercent) },
            ]}
          >
            {formatPercent(item.changePercent)}
          </Text>
        ) : null}
        {!isCash ? (
          <Text style={styles.share}>
            {formatPortfolioShare(item.portfolioShare)}
          </Text>
        ) : null}
      </View>
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
  valueColumn: {
    alignItems: 'flex-end',
    flexShrink: 0,
    gap: spacing.xs,
  },
  value: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    lineHeight: typography.fontSize.sm + 7,
    color: colors.text,
    textAlign: 'right',
  },
  change: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
  },
  share: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
