import { Account } from '../../../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    number: 'БИС 23196600',
    balance: 91027,
    changeFromZero: -33574,
    changePercentFromZero: -31.18,
  },
  {
    id: '2',
    number: 'ИИС 10458231',
    balance: 245600,
    changeFromZero: 18240,
    changePercentFromZero: 8.02,
  },
  {
    id: '3',
    number: 'БИС 88712045',
    balance: 158430,
    changeFromZero: 0,
    changePercentFromZero: 0,
  },
];

export function getAccountById(accountId: string): Account | undefined {
  return mockAccounts.find((account) => account.id === accountId);
}
