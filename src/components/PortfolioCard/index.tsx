import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

import {
  formatPortfolioDataTimestamp,
  formatPortfolioMoney,
} from '../../shared/lib/formatFinance';
import { PortfolioCurrency } from '../../shared/lib/convertPortfolioCurrency';
import { colors, radius, spacing, typography } from '../../shared/theme';

type PortfolioCardProps = {
  cpid: string;
  balance: number;
  currencyCode?: PortfolioCurrency;
  dataAsOf?: string;
  width?: number;
  onPress?: () => void;
};

export function PortfolioCard({
  cpid,
  balance,
  currencyCode = 'USD',
  dataAsOf = '11:20',
  width,
  onPress,
}: PortfolioCardProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `Портфель CPID ${cpid}` : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrapper,
        width !== undefined && { width },
        onPress && pressed && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={[
          colors.portfolioCardGradient.start,
          colors.portfolioCardGradient.middle,
          colors.portfolioCardGradient.end,
        ]}
        locations={[0, 0.42, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.15, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.subtitle}>Портфель · CPID {cpid}</Text>
        <Text style={styles.balance}>
          {formatPortfolioMoney(balance, currencyCode)}
        </Text>
        <Text style={styles.timestamp}>
          {formatPortfolioDataTimestamp(dataAsOf)}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  card: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg + spacing.xs,
    gap: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  balance: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    lineHeight: 40,
    color: colors.text,
  },
  timestamp: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  pressed: {
    opacity: 0.92,
  },
});
