import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../../app/navigation';
import { AccountsCarousel } from '../../components/AccountsCarousel';
import { ActualNewsSection } from '../../components/ActualNewsSection';
import { AssetList } from '../../components/AssetList';
import { CategoryTabs } from '../../components/CategoryTabs';
import {
  BOTTOM_SCROLL_FADE_HEIGHT,
} from '../../components/BottomScrollFade';
import {
  HomeBottomBar,
  useHomeBottomBarHeight,
} from '../../components/HomeBottomBar';
import { HomeHeader } from '../../components/HomeHeader';
import { colors, spacing } from '../../shared/theme';
import { mockActualNews } from './data/mockActualNews';
import { mockAccounts } from './data/mockAccounts';
import { getSecuritiesForTab, mockSecurities } from './data/mockSecurities';
import { portfolioTabs, PortfolioTabId } from './data/portfolioTabs';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const bottomBarHeight = useHomeBottomBarHeight();
  const [selectedTab, setSelectedTab] = useState<PortfolioTabId>('actual');
  const [dismissedNewsIds, setDismissedNewsIds] = useState<string[]>([]);
  const securities = useMemo(
    () => getSecuritiesForTab(mockSecurities, selectedTab),
    [selectedTab],
  );
  const actualNews = useMemo(
    () => mockActualNews.filter((item) => !dismissedNewsIds.includes(item.id)),
    [dismissedNewsIds],
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
          <ActualNewsSection
            items={actualNews}
            onDismiss={(id) =>
              setDismissedNewsIds((current) => [...current, id])
            }
          />
          <CategoryTabs
            tabs={portfolioTabs}
            selectedId={selectedTab}
            onSelect={(id) => setSelectedTab(id as PortfolioTabId)}
          />
          <AssetList securities={securities} />
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
