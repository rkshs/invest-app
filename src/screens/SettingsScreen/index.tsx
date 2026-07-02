import { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../app/navigation';
import { SettingsExpandableRow } from '../../components/SettingsExpandableRow';
import { useAuth } from '../../features/auth/model/AuthContext';
import { ChangePasswordForm } from '../../features/settings/ui/ChangePasswordForm';
import { ChangePinForm } from '../../features/settings/ui/ChangePinForm';
import { LinkedDevicesList } from '../../features/settings/ui/LinkedDevicesList';
import { colors, radius, spacing, typography } from '../../shared/theme';

type SettingsNavigationProp = NativeStackNavigationProp<
  ClientStackParamList,
  'Settings'
>;

export function SettingsScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { logout } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Настройки',
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerBackground: () => <View style={styles.headerBackground} />,
    });
  }, [navigation]);

  const toggleSection = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.menu}>
        <SettingsExpandableRow
          title="Смена пин-кода"
          icon="keypad-outline"
          expanded={expandedId === 'pin'}
          onToggle={() => toggleSection('pin')}
        >
          <ChangePinForm />
        </SettingsExpandableRow>

        <SettingsExpandableRow
          title="Смена пароля"
          icon="lock-closed-outline"
          expanded={expandedId === 'password'}
          onToggle={() => toggleSection('password')}
        >
          <ChangePasswordForm />
        </SettingsExpandableRow>

        <SettingsExpandableRow
          title="Привязанные устройства"
          icon="phone-portrait-outline"
          expanded={expandedId === 'devices'}
          onToggle={() => toggleSection('devices')}
          isLast
        >
          <LinkedDevicesList />
        </SettingsExpandableRow>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Выйти"
        onPress={logout}
        style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
      >
        <Text style={styles.logoutButtonText}>Выйти</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  menu: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
  },
  headerBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
    marginTop: spacing.lg,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm + 1,
    color: colors.red,
  },
  pressed: {
    opacity: 0.85,
  },
});
