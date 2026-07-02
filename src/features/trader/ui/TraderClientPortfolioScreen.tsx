import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { TraderStackParamList } from '../../../app/navigation';
import { PortfolioDetailsScroll } from '../../portfolio/ui/PortfolioDetailsContent';
import { colors } from '../../../shared/theme';

type TraderClientPortfolioRouteProp = RouteProp<
  TraderStackParamList,
  'TraderClientPortfolio'
>;
type TraderClientPortfolioNavigationProp = NativeStackNavigationProp<
  TraderStackParamList,
  'TraderClientPortfolio'
>;

export function TraderClientPortfolioScreen() {
  const route = useRoute<TraderClientPortfolioRouteProp>();
  const navigation = useNavigation<TraderClientPortfolioNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.clientName,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerBackground: () => <View style={styles.headerBackground} />,
    });
  }, [navigation, route.params.clientName]);

  return <PortfolioDetailsScroll accountId={route.params.accountId} />;
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
