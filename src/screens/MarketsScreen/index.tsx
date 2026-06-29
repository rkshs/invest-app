import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../shared/theme';

export function MarketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Рынки</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
});
