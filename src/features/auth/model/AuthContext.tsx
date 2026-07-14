import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { Session, UserRole } from '../../../entities/session/types';

export type AuthTransitionMode = 'enter' | 'exit' | null;

type AuthContextValue = {
  session: Session | null;
  transitionMode: AuthTransitionMode;
  revealAuthAfterExit: boolean;
  loginAsClient: () => void;
  loginAsTrader: () => void;
  loginWithRole: (role: UserRole) => void;
  finishEnterTransition: () => void;
  clearSessionAfterExitCover: () => void;
  finishExitTransition: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [transitionMode, setTransitionMode] = useState<AuthTransitionMode>(null);
  const [revealAuthAfterExit, setRevealAuthAfterExit] = useState(false);

  const finishEnterTransition = useCallback(() => {
    setTransitionMode(null);
  }, []);

  const clearSessionAfterExitCover = useCallback(() => {
    setSession(null);
    setRevealAuthAfterExit(true);
  }, []);

  const finishExitTransition = useCallback(() => {
    setTransitionMode(null);
    setRevealAuthAfterExit(false);
  }, []);

  const beginLogin = useCallback((role: UserRole) => {
    setSession({ role });
    setTransitionMode('enter');
  }, []);

  const loginWithRole = useCallback(
    (role: UserRole) => {
      beginLogin(role);
    },
    [beginLogin],
  );

  const logout = useCallback(() => {
    if (!session || transitionMode !== null) {
      return;
    }

    setTransitionMode('exit');
  }, [session, transitionMode]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      transitionMode,
      revealAuthAfterExit,
      loginAsClient: () => beginLogin('client'),
      loginAsTrader: () => beginLogin('trader'),
      loginWithRole,
      finishEnterTransition,
      clearSessionAfterExitCover,
      finishExitTransition,
      logout,
    }),
    [
      beginLogin,
      clearSessionAfterExitCover,
      finishEnterTransition,
      finishExitTransition,
      loginWithRole,
      logout,
      revealAuthAfterExit,
      session,
      transitionMode,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export function useUserRole(): UserRole | null {
  return useAuth().session?.role ?? null;
}
