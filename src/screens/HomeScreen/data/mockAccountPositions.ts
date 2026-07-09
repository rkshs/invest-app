import {
  AccountPosition,
  AccountPositionsSummary,
} from '../../../types/accountPosition';
import { Security } from '../../../types';

const accountPositions: Record<string, AccountPosition[]> = {
  '1': [
    {
      id: '1',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      isin: 'US0378331005',
      securityType: 'stock',
      quantity: 100,
      unitPrice: 182,
      changeAmount: 800,
      changePercent: 4.6,
      currencyCode: 'USD',
    },
    {
      id: '2',
      name: 'Microsoft',
      ticker: 'MSFT',
      isin: 'US5949181045',
      securityType: 'stock',
      quantity: 50,
      unitPrice: 442,
      changeAmount: 1300,
      changePercent: 6.2,
      currencyCode: 'USD',
    },
    {
      id: '3',
      name: 'Vanguard Bond ETF',
      ticker: 'BND',
      isin: 'US9219378356',
      securityType: 'etf',
      quantity: 200,
      unitPrice: 241,
      changeAmount: 700,
      changePercent: 1.5,
      currencyCode: 'USD',
    },
    {
      id: '8',
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      isin: 'US88160R1014',
      securityType: 'stock',
      quantity: 8,
      unitPrice: 250,
      changeAmount: -24,
      changePercent: -1.2,
      currencyCode: 'USD',
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Amazon.com',
      ticker: 'AMZN',
      isin: 'US0231351067',
      securityType: 'stock',
      quantity: 15,
      unitPrice: 180,
      changeAmount: 55,
      changePercent: 2.1,
      currencyCode: 'USD',
    },
    {
      id: '5',
      name: 'Alphabet Inc.',
      ticker: 'GOOGL',
      isin: 'US02079K3059',
      securityType: 'stock',
      quantity: 10,
      unitPrice: 175,
      changeAmount: 58,
      changePercent: 3.4,
      currencyCode: 'USD',
    },
    {
      id: '8',
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      isin: 'US88160R1014',
      securityType: 'stock',
      quantity: 8,
      unitPrice: 250,
      changeAmount: -24,
      changePercent: -1.2,
      currencyCode: 'USD',
    },
  ],
  '3': [
    {
      id: '6',
      name: 'NVIDIA',
      ticker: 'NVDA',
      isin: 'US67066G1040',
      securityType: 'stock',
      quantity: 20,
      unitPrice: 920,
      changeAmount: 1440,
      changePercent: 8.5,
      currencyCode: 'EUR',
    },
    {
      id: '7',
      name: 'iShares Core MSCI Europe',
      ticker: 'IEUR',
      isin: 'US46434V7389',
      securityType: 'etf',
      quantity: 150,
      unitPrice: 61.33,
      changeAmount: 82,
      changePercent: 0.9,
      currencyCode: 'EUR',
    },
  ],
  '4': [
    {
      id: '4',
      name: 'Amazon.com Inc.',
      ticker: 'AMZN',
      isin: 'US0231351067',
      securityType: 'stock',
      quantity: 25,
      unitPrice: 198,
      changeAmount: 210,
      changePercent: 4.4,
      currencyCode: 'USD',
    },
    {
      id: '5',
      name: 'Alphabet Inc.',
      ticker: 'GOOGL',
      isin: 'US02079K3059',
      securityType: 'stock',
      quantity: 18,
      unitPrice: 175,
      changeAmount: 96,
      changePercent: 3.1,
      currencyCode: 'USD',
    },
  ],
  '5': [
    {
      id: '8',
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      isin: 'US88160R1014',
      securityType: 'stock',
      quantity: 12,
      unitPrice: 250,
      changeAmount: -48,
      changePercent: -1.6,
      currencyCode: 'USD',
    },
    {
      id: '3',
      name: 'Vanguard Total Bond Market ETF',
      ticker: 'BND',
      isin: 'US9219378356',
      securityType: 'etf',
      quantity: 80,
      unitPrice: 72.5,
      changeAmount: 12,
      changePercent: 0.2,
      currencyCode: 'USD',
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
