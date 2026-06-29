import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  mapCashToPortfolioRow,
  mapSecurityToPortfolioRow,
} from '../../shared/lib/mapPortfolioRow';
import { spacing } from '../../shared/theme';
import { CashPosition } from '../../types/portfolioCash';
import { Security } from '../../types';
import { PortfolioPositionRow } from '../PortfolioPositionRow';

type AssetListProps = {
  securities: Security[];
  cashPositions: CashPosition[];
  portfolioTotalValue: number;
};

export function AssetList({
  securities,
  cashPositions,
  portfolioTotalValue,
}: AssetListProps) {
  const rows = useMemo(
    () => [
      ...securities.map((security) =>
        mapSecurityToPortfolioRow(security, portfolioTotalValue),
      ),
      ...cashPositions.map((cash) =>
        mapCashToPortfolioRow(cash, portfolioTotalValue),
      ),
    ],
    [cashPositions, portfolioTotalValue, securities],
  );

  return (
    <View style={styles.list}>
      {rows.map((item, index) => (
        <PortfolioPositionRow
          key={item.id}
          item={item}
          isLast={index === rows.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
});
