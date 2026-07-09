import { Security } from '../../../types';
import { mockSecurities } from './mockSecurities';

const accountSecurityIds: Record<string, string[]> = {
  '1': ['1', '2', '3', '8'],
  '2': ['4', '5', '8'],
  '3': ['6', '7'],
  '4': ['4', '5'],
  '5': ['8', '3'],
};

export function getSecuritiesForAccount(accountId: string): Security[] {
  const securityIds = accountSecurityIds[accountId] ?? [];

  return mockSecurities.filter((security) => securityIds.includes(security.id));
}
