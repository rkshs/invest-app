import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  formatAccountDynamics,
  formatMoney,
} from '../../shared/lib/formatFinance';
import {
  generateSparklinePoints,
  getSparklineTrend,
} from '../../shared/lib/generateSparkline';
import { colors, radius, shadows, spacing, typography, layout } from '../../shared/theme';
import { Sparkline } from '../Sparkline';

type PortfolioCardProps = {
  accountNumber: string;
  balance: number;
  changeFromZero: number;
  changePercentFromZero: number;
  width?: number;
  onPress?: () => void;
};

function getAccountTypeLabel(accountNumber: string): string {
  return accountNumber.split(' ')[0] ?? accountNumber;
}

export function PortfolioCard({
  accountNumber,
  balance,
  changeFromZero,
  changePercentFromZero,
  width,
  onPress,
}: PortfolioCardProps) {
  const trend = getSparklineTrend(changeFromZero);
  const sparklinePoints = generateSparklinePoints(accountNumber, trend);
  const accountType = getAccountTypeLabel(accountNumber);
  const isPositive = changeFromZero > 0;
  const isNegative = changeFromZero < 0;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `Счёт ${accountNumber}` : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        shadows.card,
        width !== undefined && { width },
        onPress && pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.main}>
          <View style={styles.header}>
            <View style={styles.accountBadge}>
              <Text style={styles.accountBadgeText}>{accountType}</Text>
            </View>
            <Text style={styles.accountNumber}>{accountNumber}</Text>
          </View>

          <Text style={styles.balance}>{formatMoney(balance)}</Text>

          <View
            style={[
              styles.dynamicsPill,
              isPositive && styles.dynamicsPillPositive,
              isNegative && styles.dynamicsPillNegative,
              !isPositive && !isNegative && styles.dynamicsPillNeutral,
            ]}
          >
            <Text
              style={[
                styles.dynamicsText,
                isPositive && styles.dynamicsTextPositive,
                isNegative && styles.dynamicsTextNegative,
              ]}
            >
              {formatAccountDynamics(changeFromZero, changePercentFromZero)}
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          <Sparkline points={sparklinePoints} trend={trend} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    height: layout.accountCardHeight,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: spacing.sm,
  },
  header: {
    gap: spacing.sm,
  },
  accountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.purpleLight,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  accountBadgeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: colors.purple,
    letterSpacing: 0.4,
  },
  accountNumber: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  balance: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginTop: spacing.md,
  },
  dynamicsPill: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    marginTop: spacing.sm,
  },
  dynamicsPillPositive: {
    backgroundColor: colors.greenLight,
  },
  dynamicsPillNegative: {
    backgroundColor: colors.redLight,
  },
  dynamicsPillNeutral: {
    backgroundColor: colors.surface,
  },
  dynamicsText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  dynamicsTextPositive: {
    color: colors.green,
  },
  dynamicsTextNegative: {
    color: colors.red,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pressed: {
    opacity: 0.92,
  },
});
