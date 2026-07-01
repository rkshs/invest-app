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
      quantity: 80,
      unitPrice: 35,
      changeAmount: 120,
      changePercent: 5.67,
      currencyCode: 'USD',
    },
    {
      id: '2',
      name: 'Газпром',
      ticker: 'GAZP',
      isin: 'RU0007661625',
      securityType: 'stock',
      quantity: 300,
      unitPrice: 14,
      changeAmount: -40,
      changePercent: -1.02,
      currencyCode: 'USD',
    },
    {
      id: '3',
      name: 'Норникель',
      ticker: 'GMKN',
      isin: 'RU0007288411',
      securityType: 'stock',
      quantity: 8,
      unitPrice: 1550,
      changeAmount: -180,
      changePercent: -1.48,
      currencyCode: 'USD',
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Лукойл',
      ticker: 'LKOH',
      isin: 'RU0009024277',
      securityType: 'stock',
      quantity: 5,
      unitPrice: 430,
      changeAmount: -25,
      changePercent: -1.15,
      currencyCode: 'USD',
    },
    {
      id: '5',
      name: 'Яндекс',
      ticker: 'YDEX',
      isin: 'RU000A107T19',
      securityType: 'stock',
      quantity: 12,
      unitPrice: 400,
      changeAmount: 210,
      changePercent: 4.6,
      currencyCode: 'USD',
    },
    {
      id: '6',
      name: 'ОФЗ 26207',
      ticker: 'SU26207RMFS9',
      isin: 'RU000A0JS3W6',
      securityType: 'bond',
      quantity: 20,
      unitPrice: 99,
      changeAmount: 60,
      changePercent: 3.12,
      currencyCode: 'USD',
    },
  ],
  '3': [
    {
      id: '7',
      name: 'Татнефть',
      ticker: 'TATN',
      isin: 'RU0006938994',
      securityType: 'stock',
      quantity: 25,
      unitPrice: 62,
      changeAmount: 18,
      changePercent: 1.18,
      currencyCode: 'EUR',
    },
    {
      id: '8',
      name: 'RTS-3.26',
      ticker: 'RIH6',
      isin: 'FUTRI0626000',
      securityType: 'future',
      quantity: 1,
      unitPrice: 102000,
      changeAmount: -12,
      changePercent: -0.11,
      currencyCode: 'EUR',
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
