import { Account } from '../../types';

export function formatAccountTitle(account: Account): string {
  return `CPID ${account.cpid} — ${account.ownerName}`;
}
