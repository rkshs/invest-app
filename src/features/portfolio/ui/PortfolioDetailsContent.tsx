import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AccountStocksSection } from '../../../components/AccountStocksSection';
import { PortfolioCard } from '../../../components/PortfolioCard';
import { getPortfolioTotal } from '../../../shared/lib/mapPortfolioRow';
import { colors, spacing, typography } from '../../../shared/theme';
import { getCurrenciesForAccount } from '../../../screens/HomeScreen/data/mockAccountCurrencies';
import { getAccountById } from '../../../screens/HomeScreen/data/mockAccounts';
import {
  getPositionsForAccount,
  getPositionsSummary,
  mapPositionToSecurity,
} from '../../../screens/HomeScreen/data/mockAccountPositions';

type PortfolioDetailsContentProps = {
  accountId: string;
};

export function PortfolioDetailsContent({ accountId }: PortfolioDetailsContentProps) {
  const account = getAccountById(accountId);
  const currencies = useMemo(
    () => (account ? getCurrenciesForAccount(account.id) : []),
    [account],
  );
  const positions = useMemo(
    () => (account ? getPositionsForAccount(account.id) : []),
    [account],
  );
  const positionsSummary = useMemo(
    () => getPositionsSummary(positions),
    [positions],
  );
  const portfolioTotalValue = useMemo(
    () =>
      getPortfolioTotal(
        positions.map(mapPositionToSecurity),
        currencies.map((currency) => ({
          id: `cash-${currency.id}`,
          name: currency.name,
          currencyCode: currency.code,
          balance: currency.balance,
          portfolioValue: currency.balance,
        })),
      ),
    [currencies, positions],
  );

  if (!account) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Счёт не найден</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.summary}>
        <PortfolioCard
          cpid={account.cpid}
          balance={account.balance}
          currencyCode={account.currencyCode}
          dataAsOf={account.dataAsOf}
        />
      </View>

      <AccountStocksSection
        positions={positions}
        currencies={currencies}
        totalValue={positionsSummary.totalValue}
        totalChange={positionsSummary.totalChange}
        portfolioTotalValue={portfolioTotalValue}
        currencyCode={account.currencyCode ?? 'USD'}
      />
    </>
  );
}

type PortfolioDetailsScrollProps = PortfolioDetailsContentProps;

export function PortfolioDetailsScroll({ accountId }: PortfolioDetailsScrollProps) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PortfolioDetailsContent accountId={accountId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  summary: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  emptyStateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});
