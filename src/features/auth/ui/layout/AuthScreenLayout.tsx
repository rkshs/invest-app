import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../../../shared/theme';
import { AuthLogo } from '../components/AuthLogo';
import { AuthTextLink } from '../components/AuthTextLink';

type AuthScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  showLogo?: boolean;
  backLinkLabel?: string;
  onBackLinkPress?: () => void;
};

export function AuthScreenLayout({
  title,
  subtitle,
  children,
  footer,
  showLogo = true,
  backLinkLabel,
  onBackLinkPress,
}: AuthScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: Math.max(insets.bottom, spacing.xl),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {showLogo ? (
          <View style={styles.logoSection}>
            <AuthLogo />
          </View>
        ) : null}

        <View style={styles.header}>
          {backLinkLabel && onBackLinkPress ? (
            <AuthTextLink label={backLinkLabel} onPress={onBackLinkPress} />
          ) : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {children ? <View style={styles.body}>{children}</View> : null}

        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  header: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  body: {
    gap: spacing.md,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.md,
  },
});
