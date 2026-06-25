import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';

type TabIconName = ComponentProps<typeof Ionicons>['name'];

export type CategoryTab = {
  id: string;
  label: string;
  icon: TabIconName;
};

type CategoryTabsProps = {
  tabs: CategoryTab[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function CategoryTabs({ tabs, selectedId, onSelect }: CategoryTabsProps) {
  return (
    <FlatList
      horizontal
      data={tabs}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedId;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(item.id)}
            style={({ pressed }) => [
              styles.tab,
              isSelected ? styles.tabSelected : styles.tabDefault,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name={item.icon}
              size={16}
              color={isSelected ? colors.white : colors.text}
            />
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {item.label}
            </Text>
          </Pressable>
        );
      }}
      ItemSeparatorComponent={TabSeparator}
    />
  );
}

function TabSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.full,
  },
  tabDefault: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(8, 21, 12, 0.08)',
  },
  tabSelected: {
    backgroundColor: colors.text,
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  labelSelected: {
    color: colors.white,
  },
  separator: {
    width: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
});
