import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../shared/theme';
import { PortfolioRowData } from '../../types/portfolioRow';
import { PortfolioPositionRow } from '../PortfolioPositionRow';

type PortfolioListSectionProps = {
  title: string;
  items: PortfolioRowData[];
};

export function PortfolioListSection({ title, items }: PortfolioListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.list}>
        {items.map((item, index) => (
          <PortfolioPositionRow
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  list: {},
});
