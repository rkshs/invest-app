import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '../../shared/theme';

export const BOTTOM_SCROLL_FADE_HEIGHT = 48;

const fadeStartColor = 'rgba(11, 16, 23, 0)';

export function BottomScrollFadeContent() {
  return (
    <View style={styles.fade}>
      <BlurView intensity={Platform.OS === 'web' ? 12 : 24} tint="dark" style={styles.blur} />
      <LinearGradient
        colors={[fadeStartColor, colors.background]}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fade: {
    height: BOTTOM_SCROLL_FADE_HEIGHT,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
});
