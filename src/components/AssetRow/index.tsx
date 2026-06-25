import { StyleSheet, Text, View } from 'react-native';

import { formatMoney, formatPercent } from '../../shared/lib/formatFinance';
import {
  generateSparklinePoints,
  getSparklineTrend,
} from '../../shared/lib/generateSparkline';
import { getTickerAppearance } from '../../shared/lib/getTickerAppearance';
import { colors, radius, shadows, spacing, typography } from '../../shared/theme';
import { Security } from '../../types';
import { Sparkline } from '../Sparkline';

type AssetRowProps = {
  security: Security;
};

export function AssetRow({ security }: AssetRowProps) {
  const trend = getSparklineTrend(security.changePercent);
  const sparklinePoints = generateSparklinePoints(security.ticker, trend, 10);
  const tickerAppearance = getTickerAppearance(security.ticker);
  const isPositive = security.changePercent > 0;
  const isNegative = security.changePercent < 0;

  return (
    <View style={[styles.card, shadows.card]}>
      <View style={styles.row}>
        <View
          style={[
            styles.logo,
            { backgroundColor: tickerAppearance.backgroundColor },
          ]}
        >
          <Text style={[styles.logoText, { color: tickerAppearance.color }]}>
            {tickerAppearance.label}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{security.name}</Text>
          <Text style={styles.ticker}>{security.ticker}</Text>
        </View>

        <View style={styles.chart}>
          <Sparkline
            points={sparklinePoints}
            trend={trend}
            width={72}
            height={36}
            showDot={false}
          />
        </View>

        <View style={styles.pricing}>
          <Text style={styles.price}>{formatMoney(security.price)}</Text>
          <Text
            style={[
              styles.change,
              isPositive && styles.changePositive,
              isNegative && styles.changeNegative,
            ]}
          >
            {formatPercent(security.changePercent)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm + 4,
    minWidth: 88,
  },
  name: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  ticker: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chart: {
    marginHorizontal: spacing.xs,
  },
  pricing: {
    alignItems: 'flex-end',
    minWidth: 88,
  },
  price: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  change: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  changePositive: {
    color: colors.green,
  },
  changeNegative: {
    color: colors.red,
  },
});
