import { AccountCurrency } from '../../../types/accountCurrency';

const accountCurrencies: Record<string, AccountCurrency[]> = {
  '1': [
    {
      id: 'usd',
      name: 'Доллар США',
      code: 'USD',
      balance: 4200,
    },
    {
      id: 'eur',
      name: 'Евро',
      code: 'EUR',
      balance: 1800,
    },
    {
      id: 'cny',
      name: 'Китайский юань',
      code: 'CNY',
      balance: 58000,
    },
  ],
  '2': [
    {
      id: 'usd',
      name: 'Доллар США',
      code: 'USD',
      balance: 980,
    },
    {
      id: 'cny',
      name: 'Китайский юань',
      code: 'CNY',
      balance: 12500,
    },
  ],
  '3': [
    {
      id: 'eur',
      name: 'Евро',
      code: 'EUR',
      balance: 7200,
    },
    {
      id: 'cny',
      name: 'Китайский юань',
      code: 'CNY',
      balance: 34000,
    },
  ],
};

export function getCurrenciesForAccount(accountId: string): AccountCurrency[] {
  return accountCurrencies[accountId] ?? [];
}
