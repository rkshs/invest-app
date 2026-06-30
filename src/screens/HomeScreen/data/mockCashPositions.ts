import { CashPosition } from '../../../types/portfolioCash';

export const mockCashPositions: CashPosition[] = [
  {
    id: 'cash-rub',
    currencyCode: 'RUB',
    balance: 98000,
    portfolioValue: 98000,
  },
  {
    id: 'cash-usd',
    currencyCode: 'USD',
    balance: 4200,
    portfolioValue: 385000,
  },
  {
    id: 'cash-eur',
    currencyCode: 'EUR',
    balance: 1500,
    portfolioValue: 162000,
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
