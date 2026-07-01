export type SecurityInstrumentType = 'stock' | 'bond' | 'future';

export type AccountPosition = {
  id: string;
  name: string;
  ticker: string;
  isin: string;
  securityType: SecurityInstrumentType;
  quantity: number;
  unitPrice: number;
  changeAmount: number;
  changePercent: number;
  currencyCode: 'USD' | 'EUR';
};

export type AccountPositionsSummary = {
  totalValue: number;
  totalChange: number;
};
