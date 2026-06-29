import { CashPosition } from '../../../types/portfolioCash';

export const mockCashPositions: CashPosition[] = [
  {
    id: 'cash-rub',
    currencyCode: 'RUB',
    balance: 125000,
    portfolioValue: 125000,
  },
  {
    id: 'cash-usd',
    currencyCode: 'USD',
    balance: 8500,
    portfolioValue: 782000,
  },
  {
    id: 'cash-eur',
    currencyCode: 'EUR',
    balance: 3200,
    portfolioValue: 345600,
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
