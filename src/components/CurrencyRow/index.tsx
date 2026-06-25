import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatCurrencyBalance } from '../../shared/lib/formatFinance';
import { colors, spacing, typography } from '../../shared/theme';
import { AccountCurrency } from '../../types/accountCurrency';

type CurrencyRowProps = {
  currency: AccountCurrency;
  onPress?: (currency: AccountCurrency) => void;
};

export function CurrencyRow({ currency, onPress }: CurrencyRowProps) {
  const formattedBalance = formatCurrencyBalance(currency.balance, currency.code);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${currency.name}, ${formattedBalance}`}
      onPress={() => onPress?.(currency)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{currency.name}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </View>
        <Text style={styles.subtitle}>Свободный остаток</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.balance}>{formattedBalance}</Text>
        <Text style={styles.balanceSecondary}>{formattedBalance}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  left: {
    flex: 1,
    paddingRight: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  name: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  right: {
    alignItems: 'flex-end',
  },
  balance: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  balanceSecondary: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  pressed: {
    opacity: 0.85,
  },
});
