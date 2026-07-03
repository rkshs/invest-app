import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  convertPortfolioAmount,
  convertPurchasedCurrencyAmount,
  PortfolioDisplayCurrency,
} from '../../shared/lib/convertPortfolioCurrency';
import {
  mapCashToPortfolioRow,
  mapSecurityToPortfolioRow,
} from '../../shared/lib/mapPortfolioRow';
import { spacing } from '../../shared/theme';
import { CashPosition } from '../../types/portfolioCash';
import { Security } from '../../types';
import { PortfolioListSection } from '../PortfolioListSection';

type AssetListProps = {
  securities: Security[];
  cashPositions: CashPosition[];
  portfolioTotalValue: number;
  displayCurrency: PortfolioDisplayCurrency;
};

export function AssetList({
  securities,
  cashPositions,
  portfolioTotalValue,
  displayCurrency,
}: AssetListProps) {
  const securityRows = useMemo(
    () =>
      securities.map((security) => {
        const row = mapSecurityToPortfolioRow(security, portfolioTotalValue);

        return {
          ...row,
          totalValue: convertPortfolioAmount(
            row.totalValue,
            security.currencyCode,
            displayCurrency,
          ),
          currencyCode: displayCurrency,
        };
      }),
    [displayCurrency, portfolioTotalValue, securities],
  );

  const cashRows = useMemo(
    () =>
      cashPositions.map((cash) => {
        const row = mapCashToPortfolioRow(cash, portfolioTotalValue);

        return {
          ...row,
          totalValue: convertPurchasedCurrencyAmount(
            cash.balance,
            cash.currencyCode,
            displayCurrency,
          ),
          currencyCode: displayCurrency,
        };
      }),
    [cashPositions, displayCurrency, portfolioTotalValue],
  );

  if (securityRows.length === 0 && cashRows.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PortfolioListSection title="Денежные средства" items={cashRows} />
      <PortfolioListSection title="Ценные бумаги" items={securityRows} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
});
