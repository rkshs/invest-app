import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TraderStackParamList } from '../../../app/navigation';
import { useAuth } from '../../auth/model/AuthContext';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type TraderSettingsNavigationProp = NativeStackNavigationProp<
  TraderStackParamList,
  'TraderSettings'
>;

export function TraderSettingsScreen() {
  const navigation = useNavigation<TraderSettingsNavigationProp>();
  const { logout } = useAuth();

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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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
  headerBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
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
