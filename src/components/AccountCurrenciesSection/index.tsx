import { StyleSheet, View } from 'react-native';

import { spacing } from '../../shared/theme';
import { AccountCurrency } from '../../types/accountCurrency';
import { CurrencyRow } from '../CurrencyRow';

type AccountCurrenciesSectionProps = {
  currencies: AccountCurrency[];
  onCurrencyPress?: (currency: AccountCurrency) => void;
};

export function AccountCurrenciesSection({
  currencies,
  onCurrencyPress,
}: AccountCurrenciesSectionProps) {
  if (currencies.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      {currencies.map((currency) => (
        <CurrencyRow
          key={currency.id}
          currency={currency}
          onPress={onCurrencyPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
});
