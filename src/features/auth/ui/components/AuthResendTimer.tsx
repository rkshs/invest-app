import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, typography } from '../../../../shared/theme';

type AuthResendTimerProps = {
  secondsLeft: number;
  canResend: boolean;
  onResendPress: () => void;
};

export function AuthResendTimer({
  secondsLeft,
  canResend,
  onResendPress,
}: AuthResendTimerProps) {
  if (canResend) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Отправить код повторно"
        onPress={onResendPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        <Text style={styles.resendLink}>Отправить код повторно</Text>
      </Pressable>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <Text style={styles.text}>
      Отправить повторно через{' '}
      <Text style={styles.timer}>
        {minutes}:{seconds}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  text: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  timer: {
    fontFamily: typography.fontFamily.semiBold,
    color: colors.blue,
  },
  resendLink: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.blue,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
