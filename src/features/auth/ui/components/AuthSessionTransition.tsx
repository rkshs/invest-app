import { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../../../shared/theme';
import { AuthLogo } from './AuthLogo';

type AuthSessionTransitionProps = {
  mode: 'enter' | 'exit' | null;
  revealAuth: boolean;
  onEnterComplete: () => void;
  onExitSessionClear: () => void;
  onExitComplete: () => void;
  children: ReactNode;
};

const LOGO_IN_DURATION = 720;
const HOLD_DURATION = 440;
const FADE_DURATION = 1120;
const LOGO_FADE_OUT_DURATION = 960;
const CONTENT_FADE_DELAY = 240;
const CONTENT_FADE_IN_DURATION = FADE_DURATION - CONTENT_FADE_DELAY;
const EXIT_CONTENT_FADE_OUT = 780;
const EXIT_OVERLAY_IN = 980;

export function AuthSessionTransition({
  mode,
  revealAuth,
  onEnterComplete,
  onExitSessionClear,
  onExitComplete,
  children,
}: AuthSessionTransitionProps) {
  const overlayOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(1);
  const contentScale = useSharedValue(1);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.88);

  useEffect(() => {
    if (mode === 'enter') {
      overlayOpacity.value = 1;
      contentOpacity.value = 0;
      contentScale.value = 0.985;
      logoOpacity.value = 0;
      logoScale.value = 0.88;

      logoOpacity.value = withSequence(
        withTiming(1, {
          duration: LOGO_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
        withDelay(
          HOLD_DURATION + 240,
          withTiming(0, {
            duration: LOGO_FADE_OUT_DURATION,
            easing: Easing.in(Easing.quad),
          }),
        ),
      );

      logoScale.value = withSequence(
        withTiming(1, {
          duration: LOGO_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
        withDelay(
          HOLD_DURATION,
          withTiming(1.04, {
            duration: FADE_DURATION,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
      );

      contentOpacity.value = withDelay(
        HOLD_DURATION + CONTENT_FADE_DELAY,
        withTiming(1, {
          duration: CONTENT_FADE_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
      );

      contentScale.value = withDelay(
        HOLD_DURATION + CONTENT_FADE_DELAY,
        withTiming(1, {
          duration: CONTENT_FADE_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
      );

      overlayOpacity.value = withDelay(
        HOLD_DURATION,
        withTiming(
          0,
          {
            duration: FADE_DURATION,
            easing: Easing.out(Easing.cubic),
          },
          (finished) => {
            if (finished) {
              runOnJS(onEnterComplete)();
            }
          },
        ),
      );

      return;
    }

    if (mode === 'exit') {
      overlayOpacity.value = 0;
      contentOpacity.value = 1;
      contentScale.value = 1;
      logoOpacity.value = 0;
      logoScale.value = 0.94;

      contentOpacity.value = withTiming(0, {
        duration: EXIT_CONTENT_FADE_OUT,
        easing: Easing.in(Easing.quad),
      });

      contentScale.value = withTiming(0.985, {
        duration: EXIT_CONTENT_FADE_OUT,
        easing: Easing.in(Easing.quad),
      });

      logoOpacity.value = withDelay(
        EXIT_CONTENT_FADE_OUT * 0.45,
        withTiming(1, {
          duration: LOGO_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
      );

      logoScale.value = withDelay(
        EXIT_CONTENT_FADE_OUT * 0.45,
        withTiming(1, {
          duration: LOGO_IN_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
      );

      overlayOpacity.value = withSequence(
        withTiming(1, {
          duration: EXIT_OVERLAY_IN,
          easing: Easing.inOut(Easing.quad),
        }),
        withDelay(
          HOLD_DURATION,
          withTiming(
            1,
            { duration: 0 },
            (finished) => {
              if (finished) {
                runOnJS(onExitSessionClear)();
              }
            },
          ),
        ),
        withTiming(
          0,
          {
            duration: FADE_DURATION,
            easing: Easing.out(Easing.cubic),
          },
          (finished) => {
            if (finished) {
              runOnJS(onExitComplete)();
            }
          },
        ),
      );

      logoOpacity.value = withSequence(
        withDelay(
          EXIT_CONTENT_FADE_OUT * 0.45,
          withTiming(1, {
            duration: LOGO_IN_DURATION,
            easing: Easing.out(Easing.cubic),
          }),
        ),
        withDelay(
          HOLD_DURATION + EXIT_OVERLAY_IN - EXIT_CONTENT_FADE_OUT * 0.45,
          withTiming(0, {
            duration: LOGO_FADE_OUT_DURATION,
            easing: Easing.in(Easing.quad),
          }),
        ),
      );
    }
  }, [
    contentOpacity,
    contentScale,
    logoOpacity,
    logoScale,
    mode,
    onEnterComplete,
    onExitComplete,
    onExitSessionClear,
    overlayOpacity,
  ]);

  useEffect(() => {
    if (mode !== 'exit' || !revealAuth) {
      return;
    }

    contentOpacity.value = 0;
    contentScale.value = 0.985;

    contentOpacity.value = withTiming(1, {
      duration: CONTENT_FADE_IN_DURATION,
      easing: Easing.out(Easing.cubic),
    });

    contentScale.value = withTiming(1, {
      duration: CONTENT_FADE_IN_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [contentOpacity, contentScale, mode, revealAuth]);

  useEffect(() => {
    if (mode !== null) {
      return;
    }

    contentOpacity.value = 1;
    contentScale.value = 1;
    overlayOpacity.value = 0;
    logoOpacity.value = 0;
    logoScale.value = 0.88;
  }, [contentOpacity, contentScale, logoOpacity, logoScale, mode, overlayOpacity]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.content, contentStyle]}>{children}</Animated.View>

      {mode ? (
        <Animated.View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="auto"
          style={[styles.overlay, overlayStyle]}
        >
          <View style={styles.backdrop} />
          <Animated.View style={[styles.logoWrap, logoStyle]}>
            <AuthLogo />
          </Animated.View>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    elevation: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
