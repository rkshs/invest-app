import { UserRole } from '../../../../entities/session/types';
import { AuthIdentifierPayload } from '../types';

export const DEMO_TRADER_IDENTIFIER: AuthIdentifierPayload = {
  type: 'email',
  value: 'trader@otcm.demo',
};

export const DEMO_TRADER_PASSWORD = 'Trader123';
export const DEMO_TRADER_PIN = '654321';

export function isDemoTraderIdentifier(identifierValue: string): boolean {
  return identifierValue.trim().toLowerCase() === DEMO_TRADER_IDENTIFIER.value;
}

export function resolveDemoRole(identifierValue: string): UserRole {
  return isDemoTraderIdentifier(identifierValue) ? 'trader' : 'client';
}

export function seedDemoTraderAccount(
  setPassword: (identifierValue: string, password: string) => void,
  setPin: (identifierValue: string, pin: string) => void,
): void {
  setPassword(DEMO_TRADER_IDENTIFIER.value, DEMO_TRADER_PASSWORD);
  setPin(DEMO_TRADER_IDENTIFIER.value, DEMO_TRADER_PIN);
}
