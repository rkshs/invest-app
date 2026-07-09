import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PasswordRequirement } from '../../lib/validatePassword';
import { colors, spacing, typography } from '../../../../shared/theme';

type AuthPasswordRequirementsProps = {
  requirements: PasswordRequirement[];
};

export function AuthPasswordRequirements({ requirements }: AuthPasswordRequirementsProps) {
  return (
    <View style={styles.container}>
      {requirements.map((requirement) => (
        <View key={requirement.id} style={styles.row}>
          <Ionicons
            name={requirement.met ? 'checkmark-circle' : 'ellipse-outline'}
            size={18}
            color={requirement.met ? colors.green : colors.textMuted}
          />
          <Text
            style={[
              styles.label,
              requirement.met ? styles.labelMet : styles.labelPending,
            ]}
          >
            {requirement.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm + 6,
  },
  labelMet: {
    color: colors.textSecondary,
  },
  labelPending: {
    color: colors.textMuted,
  },
});
