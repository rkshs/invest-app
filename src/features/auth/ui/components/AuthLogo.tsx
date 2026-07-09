import { Image, StyleSheet, View } from 'react-native';

import { radius } from '../../../../shared/theme';

const LOGO_SIZE = 72;

export function AuthLogo() {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel="OTCM"
        source={require('../../../../../assets/icon.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: radius.full,
  },
});
