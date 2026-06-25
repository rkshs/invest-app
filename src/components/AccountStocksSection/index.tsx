import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mapPositionToSecurity } from '../../screens/HomeScreen/data/mockAccountPositions';
import { formatMoney } from '../../shared/lib/formatFinance';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { AccountPosition } from '../../types/accountPosition';
import { AssetRow } from '../AssetRow';

type AccountStocksSectionProps = {
  positions: AccountPosition[];
  totalValue: number;
  totalChange: number;
};

export function AccountStocksSection({
  positions,
  totalValue,
  totalChange,
}: AccountStocksSectionProps) {
  const [expanded, setExpanded] = useState(true);

  if (positions.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel="Акции"
        onPress={() => setExpanded((current) => !current)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Акции</Text>
          <Text style={styles.summaryLine}>
            <Text style={styles.summaryValue}>{formatMoney(totalValue)}</Text>
            <Text style={styles.summaryChange}> • {formatMoney(totalChange)}</Text>
          </Text>
        </View>

        <View style={styles.toggleButton}>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.text}
          />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.list}>
          {positions.map((position) => (
            <AssetRow
              key={position.id}
              security={mapPositionToSecurity(position)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  summaryLine: {
    marginTop: spacing.xs,
  },
  summaryValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  summaryChange: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  toggleButton: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
});
