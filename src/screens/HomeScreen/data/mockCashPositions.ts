import { CashPosition } from '../../../types/portfolioCash';

export const mockCashPositions: CashPosition[] = [
  {
    id: 'cash-usd',
    name: 'Доллар США',
    currencyCode: 'USD',
    balance: 4200,
    portfolioValue: 4200,
  },
  {
    id: 'cash-eur',
    name: 'Евро',
    currencyCode: 'EUR',
    balance: 1500,
    portfolioValue: 1500,
  },
  {
    id: 'cash-cny',
    name: 'Китайский юань',
    currencyCode: 'CNY',
    balance: 58000,
    portfolioValue: 58000,
  },
];

export function getCashPortfolioTotal(
  cashPositions: CashPosition[] = mockCashPositions,
): number {
  return cashPositions.reduce(
    (total, position) => total + position.portfolioValue,
    0,
  );
}
