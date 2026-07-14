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
import { getAuthErrorMessage } from '../../api/errors';
import { isPinComplete, PIN_LENGTH, sanitizePinInput } from '../../lib/pin';
import { useAuthFlow } from '../../model/AuthFlowContext';
import { useRegisterPinMutation } from '../../model/useAuthMutations';
import { AuthActionRow } from '../components/AuthActionRow';
import { AuthNumericKeypad } from '../components/AuthNumericKeypad';
import { AuthPinInput } from '../components/AuthPinInput';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthSecondaryButton } from '../components/AuthSecondaryButton';
import { AuthTextLink } from '../components/AuthTextLink';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthPinCodeNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthPinCode'
>;

const isWeb = Platform.OS === 'web';

export function AuthPinCodeScreen() {
  const navigation = useNavigation<AuthPinCodeNavigationProp>();
  const insets = useSafeAreaInsets();
  const { setPinDraft, identifier } = useAuthFlow();
  const registerPinMutation = useRegisterPinMutation();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const canContinue = isPinComplete(pin);

  const handlePinChange = (value: string) => {
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

  const navigateNext = async (nextPin: string | null) => {
    if (!identifier) {
      setError('Идентификатор не найден');
      return;
    }

    setError('');

    try {
      await registerPinMutation.mutateAsync({
        identifierValue: identifier.value,
        pin: nextPin,
      });
      setPinDraft(nextPin);
      navigation.navigate('AuthBiometric');
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError, 'Не удалось сохранить пин-код'));
    }
  };

  const handleSkip = () => {
    void navigateNext(null);
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    void navigateNext(pin);
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
          <Text style={styles.title}>Пин-код</Text>
          <Text style={styles.subtitle}>Необязательно — для быстрого входа</Text>
          <Text style={styles.hint}>Введите 6-значный пин-код</Text>
        </View>

        <AuthPinInput value={pin} onChange={handlePinChange} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <View
        style={[
          styles.bottomSection,
          {
            paddingHorizontal: spacing.xl,
            paddingBottom: Math.max(insets.bottom, spacing.md),
          },
        ]}
      >
        <View style={styles.divider} />

        {isWeb ? (
          <AuthNumericKeypad
            onDigitPress={handleDigitPress}
            onBackspacePress={handleBackspacePress}
          />
        ) : null}

        <AuthActionRow
          left={
            <AuthSecondaryButton
              label="Пропустить"
              onPress={handleSkip}
              disabled={registerPinMutation.isPending}
            />
          }
          right={
            <AuthPrimaryButton
              label="Далее"
              onPress={handleContinue}
              disabled={!canContinue}
              loading={registerPinMutation.isPending}
            />
          }
        />
      </View>
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
  bottomSection: {
    gap: spacing.md,
    paddingTop: spacing.sm,
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
  hint: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  error: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.red,
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderSubtle,
  },
});
