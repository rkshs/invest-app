import { Security } from '../../../types';
import { mockSecurities } from './mockSecurities';

const accountSecurityIds: Record<string, string[]> = {
  '1': ['1', '2', '5'],
  '2': ['3', '4', '8'],
  '3': ['6', '7'],
};

export function getSecuritiesForAccount(accountId: string): Security[] {
  const securityIds = accountSecurityIds[accountId] ?? [];

  return mockSecurities.filter((security) => securityIds.includes(security.id));
}
