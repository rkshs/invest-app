import { StyleSheet, View } from 'react-native';

import { spacing } from '../../shared/theme';
import { Security } from '../../types';
import { AssetRow } from '../AssetRow';

type AssetListProps = {
  securities: Security[];
};

export function AssetList({ securities }: AssetListProps) {
  return (
    <View style={styles.list}>
      {securities.map((security) => (
        <AssetRow key={security.id} security={security} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
});
