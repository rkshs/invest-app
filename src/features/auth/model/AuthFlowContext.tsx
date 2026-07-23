import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { clearSecureLoginToken, saveSecureLoginToken } from '../lib/secureLoginToken';

export type AuthIdentifierType = 'phone' | 'email';

export type AuthIdentifier = {
  type: AuthIdentifierType;
  value: string;
  countryCode?: string;
  phoneNumber?: string;
};

type AuthFlowContextValue = {
  identifier: AuthIdentifier | null;
  passwordDraft: string | null;
  pinDraft: string | null;
  biometricEnabled: boolean;
  hasCompletedOnboarding: boolean;
  authSessionId: string | null;
  verificationToken: string | null;
  loginToken: string | null;
  setIdentifier: (identifier: AuthIdentifier) => void;
  setPasswordDraft: (password: string) => void;
  setPinDraft: (pin: string | null) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setAuthSessionId: (sessionId: string | null) => void;
  setVerificationToken: (token: string | null) => void;
  setLoginToken: (token: string | null) => void;
  completeOnboarding: () => void;
  clearIdentifier: () => void;
  clearPasswordDraft: () => void;
  clearPinDraft: () => void;
  clearAuthSession: () => void;
  resetBiometricAfterInvalidation: () => void;
};

const AuthFlowContext = createContext<AuthFlowContextValue | null>(null);

type AuthFlowProviderProps = {
  children: ReactNode;
};

export function AuthFlowProvider({ children }: AuthFlowProviderProps) {
  const [identifier, setIdentifierState] = useState<AuthIdentifier | null>(null);
  const [passwordDraft, setPasswordDraftState] = useState<string | null>(null);
  const [pinDraft, setPinDraftState] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabledState] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [authSessionId, setAuthSessionIdState] = useState<string | null>(null);
  const [verificationToken, setVerificationTokenState] = useState<string | null>(null);
  const [loginToken, setLoginTokenState] = useState<string | null>(null);

  const setIdentifier = useCallback((nextIdentifier: AuthIdentifier) => {
    setIdentifierState(nextIdentifier);
  }, []);

  const setPasswordDraft = useCallback((password: string) => {
    setPasswordDraftState(password);
  }, []);

  const setPinDraft = useCallback((pin: string | null) => {
    setPinDraftState(pin);
  }, []);

  const setBiometricEnabled = useCallback((enabled: boolean) => {
    setBiometricEnabledState(enabled);
  }, []);

  const setAuthSessionId = useCallback((sessionId: string | null) => {
    setAuthSessionIdState(sessionId);
  }, []);

  const setVerificationToken = useCallback((token: string | null) => {
    setVerificationTokenState(token);
  }, []);

  const setLoginToken = useCallback((token: string | null) => {
    setLoginTokenState(token);

    // Токен, используемый для входа/подтверждения по биометрии, синхронно
    // зеркалируется в SecureStore (requireAuthentication: true). В demo/web
    // это no-op — см. src/features/auth/lib/secureLoginToken.ts.
    if (token) {
      void saveSecureLoginToken(token);
    } else {
      void clearSecureLoginToken();
    }
  }, []);

  const clearAuthSession = useCallback(() => {
    setAuthSessionIdState(null);
    setVerificationTokenState(null);
    setLoginTokenState(null);
    void clearSecureLoginToken();
  }, []);

  const resetBiometricAfterInvalidation = useCallback(() => {
    setBiometricEnabledState(false);
    setLoginTokenState(null);
    void clearSecureLoginToken();
  }, []);

  const completeOnboarding = useCallback(() => {
    setHasCompletedOnboarding(true);
  }, []);

  const clearIdentifier = useCallback(() => {
    setIdentifierState(null);
  }, []);

  const clearPasswordDraft = useCallback(() => {
    setPasswordDraftState(null);
  }, []);

  const clearPinDraft = useCallback(() => {
    setPinDraftState(null);
  }, []);

  const value = useMemo(
    () => ({
      identifier,
      passwordDraft,
      pinDraft,
      biometricEnabled,
      hasCompletedOnboarding,
      authSessionId,
      verificationToken,
      loginToken,
      setIdentifier,
      setPasswordDraft,
      setPinDraft,
      setBiometricEnabled,
      setAuthSessionId,
      setVerificationToken,
      setLoginToken,
      completeOnboarding,
      clearIdentifier,
      clearPasswordDraft,
      clearPinDraft,
      clearAuthSession,
      resetBiometricAfterInvalidation,
    }),
    [
      authSessionId,
      biometricEnabled,
      clearAuthSession,
      clearIdentifier,
      clearPasswordDraft,
      clearPinDraft,
      completeOnboarding,
      hasCompletedOnboarding,
      identifier,
      loginToken,
      passwordDraft,
      pinDraft,
      resetBiometricAfterInvalidation,
      setAuthSessionId,
      setBiometricEnabled,
      setIdentifier,
      setLoginToken,
      setPasswordDraft,
      setPinDraft,
      setVerificationToken,
      verificationToken,
    ],
  );

  return (
    <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>
  );
}

export function useAuthFlow(): AuthFlowContextValue {
  const context = useContext(AuthFlowContext);

  if (!context) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider');
  }

  return context;
}
