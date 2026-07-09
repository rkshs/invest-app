import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../../features/auth/model/AuthContext';
import { AuthSessionTransition } from '../../features/auth/ui/components/AuthSessionTransition';
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
  const {
    session,
    transitionMode,
    revealAuthAfterExit,
    finishEnterTransition,
    clearSessionAfterExitCover,
    finishExitTransition,
  } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthSessionTransition
        mode={transitionMode}
        revealAuth={revealAuthAfterExit}
        onEnterComplete={finishEnterTransition}
        onExitSessionClear={clearSessionAfterExitCover}
        onExitComplete={finishExitTransition}
      >
        {!session ? (
          <AuthNavigator />
        ) : session.role === 'trader' ? (
          <TraderNavigator />
        ) : (
          <ClientNavigator />
        )}
      </AuthSessionTransition>
    </NavigationContainer>
  );
}
