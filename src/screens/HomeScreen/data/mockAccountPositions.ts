import {
  AccountPosition,
  AccountPositionsSummary,
} from '../../../types/accountPosition';
import { Security } from '../../../types';

const accountPositions: Record<string, AccountPosition[]> = {
  '1': [
    {
      id: '1',
      name: 'Сбербанк',
      ticker: 'SBER',
      quantity: 100,
      unitPrice: 285.4,
      changeAmount: 3540,
      changePercent: 14.2,
    },
    {
      id: '2',
      name: 'Газпром',
      ticker: 'GAZP',
      quantity: 500,
      unitPrice: 128.9,
      changeAmount: -520,
      changePercent: -0.8,
    },
    {
      id: '3',
      name: 'Норникель',
      ticker: 'GMKN',
      quantity: 10,
      unitPrice: 15420,
      changeAmount: -2580,
      changePercent: -1.67,
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Лукойл',
      ticker: 'LKOH',
      quantity: 2,
      unitPrice: 4280,
      changeAmount: -309,
      changePercent: -2.61,
    },
    {
      id: '5',
      name: 'Яндекс',
      ticker: 'YDEX',
      quantity: 15,
      unitPrice: 3980,
      changeAmount: 2663,
      changePercent: 33.31,
    },
    {
      id: '6',
      name: 'ВТБ',
      ticker: 'VTBR',
      quantity: 200,
      unitPrice: 98.5,
      changeAmount: 820,
      changePercent: 4.18,
    },
  ],
  '3': [
    {
      id: '7',
      name: 'Татнефть',
      ticker: 'TATN',
      quantity: 40,
      unitPrice: 621,
      changeAmount: 236,
      changePercent: 0.95,
    },
    {
      id: '8',
      name: 'МТС',
      ticker: 'MTSS',
      quantity: 120,
      unitPrice: 214.5,
      changeAmount: -86,
      changePercent: -0.34,
    },
  ],
};

export function getPositionsForAccount(accountId: string): AccountPosition[] {
  return accountPositions[accountId] ?? [];
}

export function getPositionsSummary(
  positions: AccountPosition[],
): AccountPositionsSummary {
  return positions.reduce(
    (summary, position) => ({
      totalValue: summary.totalValue + position.quantity * position.unitPrice,
      totalChange: summary.totalChange + position.changeAmount,
    }),
    { totalValue: 0, totalChange: 0 },
  );
}

export function mapPositionToSecurity(position: AccountPosition): Security {
  return {
    id: position.id,
    name: position.name,
    ticker: position.ticker,
    price: Math.round(position.quantity * position.unitPrice),
    changePercent: position.changePercent,
    tabIds: [],
  };
}
