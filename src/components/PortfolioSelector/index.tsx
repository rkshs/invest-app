import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { formatAccountTitle } from '../../shared/lib/formatAccount';
import { colors, radius, spacing, typography } from '../../shared/theme';
import { Account } from '../../types';

type PortfolioSelectorProps = {
  accounts: Account[];
  selectedAccountId: string;
  onSelect: (account: Account) => void;
};

export function PortfolioSelector({
  accounts,
  selectedAccountId,
  onSelect,
}: PortfolioSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedAccount =
    accounts.find((account) => account.id === selectedAccountId) ?? accounts[0];

  if (!selectedAccount) {
    return null;
  }

  const close = () => setIsOpen(false);

  const handleSelect = (account: Account) => {
    onSelect(account);
    close();
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Выбор портфеля"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen(true)}
        style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {formatAccountTitle(selectedAccount)}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close}>
          <View style={styles.menuContainer}>
            <Pressable onPress={(event) => event.stopPropagation()}>
              <View style={styles.menu}>
                <Text style={styles.menuTitle}>Портфели</Text>
                <ScrollView bounces={false}>
                  {accounts.map((account) => {
                    const isSelected = account.id === selectedAccountId;

                    return (
                      <Pressable
                        key={account.id}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => handleSelect(account)}
                        style={({ pressed }) => [
                          styles.option,
                          isSelected && styles.optionSelected,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.optionTextSelected,
                          ]}
                          numberOfLines={1}
                        >
                          {formatAccountTitle(account)}
                        </Text>
                        {isSelected ? (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color={colors.blue}
                          />
                        ) : null}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  triggerText: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    color: colors.text,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-start',
    paddingTop: 120,
    paddingHorizontal: spacing.xl,
  },
  menuContainer: {
    width: '100%',
  },
  menu: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
    maxHeight: 320,
  },
  menuTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.surfaceSoft,
  },
  optionText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  optionTextSelected: {
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
