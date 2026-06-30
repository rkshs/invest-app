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
      unitPrice: 280,
      changeAmount: 1200,
      changePercent: 5.67,
    },
    {
      id: '2',
      name: 'Газпром',
      ticker: 'GAZP',
      isin: 'RU0007661625',
      securityType: 'stock',
      quantity: 300,
      unitPrice: 130,
      changeAmount: -400,
      changePercent: -1.02,
    },
    {
      id: '3',
      name: 'Норникель',
      ticker: 'GMKN',
      isin: 'RU0007288411',
      securityType: 'stock',
      quantity: 8,
      unitPrice: 15000,
      changeAmount: -1800,
      changePercent: -1.48,
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
      unitPrice: 4300,
      changeAmount: -250,
      changePercent: -1.15,
    },
    {
      id: '5',
      name: 'Яндекс',
      ticker: 'YDEX',
      isin: 'RU000A107T19',
      securityType: 'stock',
      quantity: 12,
      unitPrice: 4000,
      changeAmount: 2100,
      changePercent: 4.6,
    },
    {
      id: '6',
      name: 'ОФЗ 26207',
      ticker: 'SU26207RMFS9',
      isin: 'RU000A0JS3W6',
      securityType: 'bond',
      quantity: 20,
      unitPrice: 990,
      changeAmount: 600,
      changePercent: 3.12,
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
      unitPrice: 620,
      changeAmount: 180,
      changePercent: 1.18,
    },
    {
      id: '8',
      name: 'RTS-3.26',
      ticker: 'RIH6',
      isin: 'FUTRI0626000',
      securityType: 'future',
      quantity: 1,
      unitPrice: 110000,
      changeAmount: -120,
      changePercent: -0.11,
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
