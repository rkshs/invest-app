import { AccountCurrency } from '../../../types/accountCurrency';

const accountCurrencies: Record<string, AccountCurrency[]> = {
  '1': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 18761.1,
    },
    {
      id: 'cny',
      name: 'Китайский юань',
      code: 'CNY',
      balance: 2028.87,
    },
  ],
  '2': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 42150.55,
    },
    {
      id: 'usd',
      name: 'Доллар США',
      code: 'USD',
      balance: 1250.4,
    },
  ],
  '3': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 9340.25,
    },
  ],
};

export function getCurrenciesForAccount(accountId: string): AccountCurrency[] {
  return accountCurrencies[accountId] ?? [];
}
