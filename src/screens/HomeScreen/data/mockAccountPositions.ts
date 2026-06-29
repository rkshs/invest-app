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
      isin: 'RU0009029540',
      securityType: 'stock',
      quantity: 100,
      unitPrice: 285.4,
      changeAmount: 3540,
      changePercent: 14.2,
    },
    {
      id: '2',
      name: 'Газпром',
      ticker: 'GAZP',
      isin: 'RU0007661625',
      securityType: 'stock',
      quantity: 500,
      unitPrice: 128.9,
      changeAmount: -520,
      changePercent: -0.8,
    },
    {
      id: '3',
      name: 'Норникель',
      ticker: 'GMKN',
      isin: 'RU0007288411',
      securityType: 'stock',
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
      isin: 'RU0009024277',
      securityType: 'stock',
      quantity: 2,
      unitPrice: 4280,
      changeAmount: -309,
      changePercent: -2.61,
    },
    {
      id: '5',
      name: 'Яндекс',
      ticker: 'YDEX',
      isin: 'RU000A107T19',
      securityType: 'stock',
      quantity: 15,
      unitPrice: 3980,
      changeAmount: 2663,
      changePercent: 33.31,
    },
    {
      id: '6',
      name: 'ОФЗ 26207',
      ticker: 'SU26207RMFS9',
      isin: 'RU000A0JS3W6',
      securityType: 'bond',
      quantity: 30,
      unitPrice: 986.2,
      changeAmount: 820,
      changePercent: 4.18,
    },
  ],
  '3': [
    {
      id: '7',
      name: 'Татнефть',
      ticker: 'TATN',
      isin: 'RU0006938994',
      securityType: 'stock',
      quantity: 40,
      unitPrice: 621,
      changeAmount: 236,
      changePercent: 0.95,
    },
    {
      id: '8',
      name: 'RTS-3.26',
      ticker: 'RIH6',
      isin: 'FUTRI0626000',
      securityType: 'future',
      quantity: 2,
      unitPrice: 112400,
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
    isin: position.isin,
    securityType: position.securityType,
    quantity: position.quantity,
    price: Math.round(position.quantity * position.unitPrice),
    changePercent: position.changePercent,
    currencyCode: position.currencyCode,
  };
}
