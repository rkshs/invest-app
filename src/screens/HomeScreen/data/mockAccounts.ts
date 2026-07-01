import { Account } from '../../../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    cpid: '700101',
    ownerName: 'Тестов А.А.',
    balance: 36500,
    changeFromZero: -8200,
    changePercentFromZero: -3.98,
    currencyCode: 'USD',
    dataAsOf: '11:20',
  },
  {
    id: '2',
    cpid: '700102',
    ownerName: 'Пример Б.Б.',
    balance: 10000,
    changeFromZero: 640,
    changePercentFromZero: 5.09,
    currencyCode: 'USD',
    dataAsOf: '11:20',
  },
  {
    id: '3',
    cpid: '700103',
    ownerName: 'Образец В.В.',
    balance: 124500,
    changeFromZero: 0,
    changePercentFromZero: 0,
    currencyCode: 'EUR',
    dataAsOf: '11:20',
  },
];

export function getAccountById(accountId: string): Account | undefined {
  return mockAccounts.find((account) => account.id === accountId);
}
