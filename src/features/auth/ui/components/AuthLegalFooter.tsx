import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../../shared/theme';

const TERMS_URL = 'https://example.com/terms';

export function AuthLegalFooter() {
  const handlePress = () => {
    void Linking.openURL(TERMS_URL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Нажимая кнопку, вы принимаете</Text>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel="Условия использования и политику GDPR"
        onPress={handlePress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <Text style={styles.link}>Условия использования и политику GDPR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  text: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  link: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.blue,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
