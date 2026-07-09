import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../../../app/navigation';
import { isPinComplete, PIN_LENGTH, sanitizePinInput } from '../../lib/pin';
import { verifyLoginPin } from '../../lib/verifyLogin';
import { useAuth } from '../../model/AuthContext';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { AuthNumericKeypad } from '../components/AuthNumericKeypad';
import { AuthPinInput } from '../components/AuthPinInput';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthTextLink } from '../components/AuthTextLink';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthLoginPinNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthLoginPin'
>;

const isWeb = Platform.OS === 'web';

export function AuthLoginPinScreen() {
  const navigation = useNavigation<AuthLoginPinNavigationProp>();
  const insets = useSafeAreaInsets();
  const { loginAsClient } = useAuth();
  const { pinDraft } = useAuthFlow();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canLogin = isPinComplete(pin);

  const handlePinChange = (value: string) => {
    setError('');
    setPin(sanitizePinInput(value));
  };

  const handleDigitPress = (digit: string) => {
    setPin((current) => {
      if (current.length >= PIN_LENGTH) {
        return current;
      }

      return `${current}${digit}`;
    });
  };

  const handleBackspacePress = () => {
    setPin((current) => current.slice(0, -1));
  };

  const handleLogin = async () => {
    if (!verifyLoginPin(pin, pinDraft)) {
      setError('Неверный пин-код');
      setPin('');
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    setIsSubmitting(false);
    loginAsClient();
  };

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
            paddingHorizontal: spacing.xl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AuthTextLink label="Назад" onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Подтверждение входа</Text>
          <Text style={styles.subtitle}>Введите 6-значный пин-код</Text>
        </View>

        <AuthPinInput value={pin} onChange={handlePinChange} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthPrimaryButton
          label="Подтвердить"
          onPress={handleLogin}
          disabled={!canLogin}
          loading={isSubmitting}
        />
      </ScrollView>

      {isWeb ? (
        <View style={[styles.keypadContainer, { paddingHorizontal: spacing.xl }]}>
          <AuthNumericKeypad
            onDigitPress={handleDigitPress}
            onBackspacePress={handleBackspacePress}
          />
        </View>
      ) : null}
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
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
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
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
  keypadContainer: {
    paddingBottom: spacing.md,
  },
});
