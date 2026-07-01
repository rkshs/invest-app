import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../../app/navigation';
import { AssetList } from '../../components/AssetList';
import {
  BOTTOM_SCROLL_FADE_HEIGHT,
} from '../../components/BottomScrollFade';
import {
  HomeBottomBar,
  useHomeBottomBarHeight,
} from '../../components/HomeBottomBar';
import { HomeHeader } from '../../components/HomeHeader';
import { PortfolioCard } from '../../components/PortfolioCard';
import { PortfolioCurrencyToggle } from '../../components/PortfolioCurrencyToggle';
import {
  convertPortfolioAmount,
  PortfolioDisplayCurrency,
  toPortfolioCurrency,
} from '../../shared/lib/convertPortfolioCurrency';
import { getPortfolioTotal } from '../../shared/lib/mapPortfolioRow';
import { colors, spacing } from '../../shared/theme';
import { getCurrenciesForAccount } from './data/mockAccountCurrencies';
import { mockAccounts } from './data/mockAccounts';
import { getSecuritiesForAccount } from './data/mockAccountSecurities';
import { getTotalUnreadCount } from '../ChatScreen/data/mockChats';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const bottomBarHeight = useHomeBottomBarHeight();
  const [selectedAccountId, setSelectedAccountId] = useState(mockAccounts[0]?.id ?? '1');
  const [displayCurrency, setDisplayCurrency] =
    useState<PortfolioDisplayCurrency>('USD');

  const selectedAccount = useMemo(
    () => mockAccounts.find((account) => account.id === selectedAccountId) ?? mockAccounts[0],
    [selectedAccountId],
  );

  const securities = useMemo(
    () => (selectedAccount ? getSecuritiesForAccount(selectedAccount.id) : []),
    [selectedAccount],
  );

  const cashPositions = useMemo(
    () =>
      selectedAccount
        ? getCurrenciesForAccount(selectedAccount.id).map((currency) => ({
            id: `cash-${currency.id}`,
            name: currency.name,
            currencyCode: currency.code,
            balance: currency.balance,
            portfolioValue: currency.balance,
          }))
        : [],
    [selectedAccount],
  );

  const portfolioTotalValue = useMemo(
    () => getPortfolioTotal(securities, cashPositions),
    [cashPositions, securities],
  );
  const unreadCount = useMemo(() => getTotalUnreadCount(), []);
  const displayBalance = useMemo(() => {
    if (!selectedAccount) {
      return 0;
    }

    return convertPortfolioAmount(
      selectedAccount.balance,
      toPortfolioCurrency(selectedAccount.currencyCode),
      displayCurrency,
    );
  }, [displayCurrency, selectedAccount]);

  if (!selectedAccount) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            {
              paddingBottom:
                bottomBarHeight + BOTTOM_SCROLL_FADE_HEIGHT + spacing.md,
            },
          ]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <HomeHeader
            accounts={mockAccounts}
            selectedAccountId={selectedAccountId}
            onAccountSelect={(account) => setSelectedAccountId(account.id)}
            onProfilePress={() => navigation.navigate('Settings')}
          />

          <View style={styles.portfolioCard}>
            <PortfolioCard
              cpid={selectedAccount.cpid}
              balance={displayBalance}
              currencyCode={displayCurrency}
              dataAsOf={selectedAccount.dataAsOf}
              onPress={() =>
                navigation.navigate('Account', { accountId: selectedAccount.id })
              }
            />
          </View>

          <PortfolioCurrencyToggle
            selectedCurrency={displayCurrency}
            onSelect={setDisplayCurrency}
          />

          <AssetList
            securities={securities}
            cashPositions={cashPositions}
            portfolioTotalValue={portfolioTotalValue}
            displayCurrency={displayCurrency}
          />
        </ScrollView>

        <HomeBottomBar
          unreadCount={unreadCount}
          onChatPress={() => navigation.navigate('Chat')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  content: {},
  portfolioCard: {
    paddingHorizontal: spacing.xl,
  },
});
