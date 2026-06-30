import { AccountCurrency } from '../../../types/accountCurrency';

const accountCurrencies: Record<string, AccountCurrency[]> = {
  '1': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 15200,
    },
    {
      id: 'cny',
      name: 'Китайский юань',
      code: 'CNY',
      balance: 1800.5,
    },
  ],
  '2': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 38500,
    },
    {
      id: 'usd',
      name: 'Доллар США',
      code: 'USD',
      balance: 980,
    },
  ],
  '3': [
    {
      id: 'rub',
      name: 'Российский рубль',
      code: 'RUB',
      balance: 7200,
    },
  ],
};

export function getCurrenciesForAccount(accountId: string): AccountCurrency[] {
  return accountCurrencies[accountId] ?? [];
}
