import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ClientStackParamList } from '../../app/navigation';
import { PortfolioDetailsScroll } from '../../features/portfolio/ui/PortfolioDetailsContent';
import { formatAccountTitle } from '../../shared/lib/formatAccount';
import { getAccountById } from '../HomeScreen/data/mockAccounts';
import { colors, spacing, typography } from '../../shared/theme';

type AccountRouteProp = RouteProp<ClientStackParamList, 'Account'>;
type AccountNavigationProp = NativeStackNavigationProp<ClientStackParamList, 'Account'>;

export function AccountScreen() {
  const route = useRoute<AccountRouteProp>();
  const navigation = useNavigation<AccountNavigationProp>();
  const account = getAccountById(route.params.accountId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account ? formatAccountTitle(account) : 'Счёт',
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerBackground: () => <View style={styles.headerBackground} />,
    });
  }, [account, navigation]);

  if (!account) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Счёт не найден</Text>
      </View>
    );
  }

  return <PortfolioDetailsScroll accountId={route.params.accountId} />;
}

const styles = StyleSheet.create({
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
