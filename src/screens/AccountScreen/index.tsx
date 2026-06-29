import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../app/navigation';
import { AccountStocksSection } from '../../components/AccountStocksSection';
import { PortfolioCard } from '../../components/PortfolioCard';
import { colors, spacing, typography } from '../../shared/theme';
import { getCurrenciesForAccount } from '../HomeScreen/data/mockAccountCurrencies';
import { getAccountById } from '../HomeScreen/data/mockAccounts';
import {
  getPositionsForAccount,
  getPositionsSummary,
} from '../HomeScreen/data/mockAccountPositions';

type AccountRouteProp = RouteProp<RootStackParamList, 'Account'>;
type AccountNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;

export function AccountScreen() {
  const route = useRoute<AccountRouteProp>();
  const navigation = useNavigation<AccountNavigationProp>();
  const account = getAccountById(route.params.accountId);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account?.number ?? 'Счёт',
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerBackground: () => <View style={styles.headerBackground} />,
    });
  }, [account?.number, navigation]);

  if (!account) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Счёт не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.summary}>
        <PortfolioCard
          accountNumber={account.number}
          balance={account.balance}
          changeFromZero={account.changeFromZero}
          changePercentFromZero={account.changePercentFromZero}
        />
      </View>

      <AccountStocksSection
        positions={positions}
        currencies={currencies}
        totalValue={positionsSummary.totalValue}
        totalChange={positionsSummary.totalChange}
        portfolioTotalValue={account.balance}
      />
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
  },
  headerBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyStateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});
