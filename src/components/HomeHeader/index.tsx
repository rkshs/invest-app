import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PortfolioSelector } from '../PortfolioSelector';
import { colors, radius, spacing } from '../../shared/theme';
import { Account } from '../../types';

type HomeHeaderProps = {
  accounts: Account[];
  selectedAccountId: string;
  onAccountSelect: (account: Account) => void;
  onProfilePress?: () => void;
};

const PROFILE_BUTTON_SIZE = 44;

export function HomeHeader({
  accounts,
  selectedAccountId,
  onAccountSelect,
  onProfilePress,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.xl,
        },
      ]}
    >
      <View style={styles.selectorRow}>
        <PortfolioSelector
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onSelect={onAccountSelect}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Профиль"
          onPress={onProfilePress}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={colors.blue} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  profileButton: {
    width: PROFILE_BUTTON_SIZE,
    height: PROFILE_BUTTON_SIZE,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatar: {
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
});
