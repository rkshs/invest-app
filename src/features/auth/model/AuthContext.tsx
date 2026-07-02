import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { Session, UserRole } from '../../../entities/session/types';

type AuthContextValue = {
  session: Session | null;
  loginAsClient: () => void;
  loginAsTrader: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loginAsClient: () => setSession({ role: 'client' }),
      loginAsTrader: () => setSession({ role: 'trader' }),
      logout: () => setSession(null),
    }),
    [session],
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
