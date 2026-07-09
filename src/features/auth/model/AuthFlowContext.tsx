import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

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
  setIdentifier: (identifier: AuthIdentifier) => void;
  setPasswordDraft: (password: string) => void;
  setPinDraft: (pin: string | null) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  completeOnboarding: () => void;
  clearIdentifier: () => void;
  clearPasswordDraft: () => void;
  clearPinDraft: () => void;
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
      setIdentifier,
      setPasswordDraft,
      setPinDraft,
      setBiometricEnabled,
      completeOnboarding,
      clearIdentifier,
      clearPasswordDraft,
      clearPinDraft,
    }),
    [
      biometricEnabled,
      clearIdentifier,
      clearPasswordDraft,
      clearPinDraft,
      completeOnboarding,
      hasCompletedOnboarding,
      identifier,
      passwordDraft,
      pinDraft,
      setBiometricEnabled,
      setIdentifier,
      setPasswordDraft,
      setPinDraft,
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
