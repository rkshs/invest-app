import {
  Onest_400Regular,
  Onest_500Medium,
  Onest_600SemiBold,
  useFonts,
} from '@expo-google-fonts/onest';
import { ReactNode, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { applyDefaultFontFamily } from '../../shared/theme/applyDefaultFontFamily';
import { AuthProvider } from '../../features/auth/model/AuthContext';
import { AuthFlowProvider } from '../../features/auth/model/AuthFlowContext';

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

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthFlowProvider>{children}</AuthFlowProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
