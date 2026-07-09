import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../../../shared/theme';

const OUTER_SIZE = 168;
const MIDDLE_SIZE = 132;
const INNER_SIZE = 88;

export function AuthBiometricIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.outerRing}>
        <View style={styles.middleRing}>
          <View style={styles.innerHexagon}>
            <View style={styles.iconWrap}>
              <Ionicons name="finger-print" size={40} color={colors.blue} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  outerRing: {
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(91, 164, 245, 0.04)',
  },
  middleRing: {
    width: MIDDLE_SIZE,
    height: MIDDLE_SIZE,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  innerHexagon: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueLight,
    transform: [{ rotate: '45deg' }],
  },
  iconWrap: {
    transform: [{ rotate: '-45deg' }],
  },
});
