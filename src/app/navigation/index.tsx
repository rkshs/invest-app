import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../../features/auth/model/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { ClientNavigator } from './ClientNavigator';
import { navigationTheme } from './navigationTheme';
import { TraderNavigator } from './TraderNavigator';

export type {
  AuthStackParamList,
  ClientStackParamList,
  TraderStackParamList,
} from './types';

export function AppNavigation() {
  const { session } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      {!session ? (
        <AuthNavigator />
      ) : session.role === 'trader' ? (
        <TraderNavigator />
      ) : (
        <ClientNavigator />
      )}
    </NavigationContainer>
  );
}
