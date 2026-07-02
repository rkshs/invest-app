import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Client } from '../../../entities/client/types';
import { getAccountById } from '../../../screens/HomeScreen/data/mockAccounts';
import { formatPortfolioMoney } from '../../../shared/lib/formatFinance';
import { colors, spacing, typography } from '../../../shared/theme';

type TraderChatDetailHeaderProps = {
  clientName: string;
  client?: Client;
  onBackPress?: () => void;
  onPortfolioPress?: () => void;
};

export function TraderChatDetailHeader({
  clientName,
  client,
  onBackPress,
  onPortfolioPress,
}: TraderChatDetailHeaderProps) {
  const insets = useSafeAreaInsets();
  const account = client ? getAccountById(client.accountId) : undefined;
  const canOpenPortfolio = Boolean(client && account && onPortfolioPress);

  const portfolioMeta =
    account &&
    `${formatPortfolioMoney(account.balance, account.currencyCode ?? 'USD')} · ${account.cpid}`;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.xl,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Назад"
        hitSlop={{ top: 12, bottom: 12, left: 8, right: 16 }}
        onPress={onBackPress}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Ionicons name="chevron-back" size={24} color={colors.text} />
      </Pressable>

      {canOpenPortfolio ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Открыть портфель клиента"
          onPress={onPortfolioPress}
          style={({ pressed }) => [styles.summaryRow, pressed && styles.pressed]}
        >
          <Text style={styles.clientName} numberOfLines={1}>
            {clientName}
          </Text>

          <View style={styles.portfolioGroup}>
            {portfolioMeta ? (
              <Text style={styles.portfolioMeta} numberOfLines={1}>
                {portfolioMeta}
              </Text>
            ) : null}
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </View>
        </Pressable>
      ) : (
        <Text style={styles.clientNameOnly} numberOfLines={1}>
          {clientName}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  backButton: {
    width: 44,
    height: 44,
    marginLeft: -spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  summaryRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minWidth: 0,
  },
  clientName: {
    flexShrink: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  portfolioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 0,
    marginLeft: 'auto',
  },
  portfolioMeta: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  clientNameOnly: {
    flex: 1,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.text,
  },
  pressed: {
    opacity: 0.75,
  },
});
