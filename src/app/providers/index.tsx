import {
  Onest_400Regular,
  Onest_500Medium,
  Onest_600SemiBold,
  useFonts,
} from '@expo-google-fonts/onest';
import { ReactNode, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { applyDefaultFontFamily } from '../../shared/theme/applyDefaultFontFamily';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [fontsLoaded] = useFonts({
    Onest_400Regular,
    Onest_500Medium,
    Onest_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      applyDefaultFontFamily();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
