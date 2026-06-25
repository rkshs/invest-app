import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '../../shared/theme';

export const BOTTOM_SCROLL_FADE_HEIGHT = 48;

export function BottomScrollFadeContent() {
  return (
    <View style={styles.fade}>
      <BlurView intensity={Platform.OS === 'web' ? 12 : 24} tint="light" style={styles.blur} />
      <LinearGradient
        colors={['rgba(250, 250, 252, 0)', colors.background]}
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
