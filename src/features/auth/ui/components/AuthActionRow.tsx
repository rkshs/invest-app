import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../../shared/theme';

type AuthActionRowProps = {
  left: ReactNode;
  right: ReactNode;
};

export function AuthActionRow({ left, right }: AuthActionRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.action}>{left}</View>
      <View style={styles.action}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  action: {
    flex: 1,
  },
});
