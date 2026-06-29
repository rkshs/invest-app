import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../../app/navigation';
import { AccountsCarousel } from '../../components/AccountsCarousel';
import { AssetList } from '../../components/AssetList';
import {
  BOTTOM_SCROLL_FADE_HEIGHT,
} from '../../components/BottomScrollFade';
import {
  HomeBottomBar,
  useHomeBottomBarHeight,
} from '../../components/HomeBottomBar';
import { HomeHeader } from '../../components/HomeHeader';
import { getPortfolioTotal } from '../../shared/lib/mapPortfolioRow';
import { colors, spacing } from '../../shared/theme';
import { mockAccounts } from './data/mockAccounts';
import { mockCashPositions } from './data/mockCashPositions';
import { mockSecurities } from './data/mockSecurities';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const bottomBarHeight = useHomeBottomBarHeight();
  const portfolioTotalValue = useMemo(
    () => getPortfolioTotal(mockSecurities, mockCashPositions),
    [],
  );

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
          <HomeHeader />
          <AccountsCarousel
            accounts={mockAccounts}
            onAccountPress={(account) =>
              navigation.navigate('Account', { accountId: account.id })
            }
          />
          <AssetList
            securities={mockSecurities}
            cashPositions={mockCashPositions}
            portfolioTotalValue={portfolioTotalValue}
          />
        </ScrollView>

        <HomeBottomBar
          onMarketsPress={() => navigation.navigate('Markets')}
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
});
