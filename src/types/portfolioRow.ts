import { SecurityInstrumentType } from './accountPosition';

export type PortfolioRowKind = 'security' | 'cash';

export type PortfolioRowData = {
  id: string;
  kind: PortfolioRowKind;
  name: string;
  ticker: string;
  isin: string;
  securityType?: SecurityInstrumentType;
  quantity: number;
  unitPrice?: number;
  changePercent?: number;
  portfolioShare: number;
  totalValue: number;
  currencyCode?: string;
};
