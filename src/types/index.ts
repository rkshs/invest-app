import type { SecurityInstrumentType } from './accountPosition';

export type { Chat } from './chat';
export type { ChatMessage } from './chatMessage';
export type { SecurityInstrumentType } from './accountPosition';
export type { PortfolioRowData, PortfolioRowKind } from './portfolioRow';
export type { CashPosition, PortfolioCurrencyCode } from './portfolioCash';

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  price: number;
  changePercent: number;
};

export type Portfolio = {
  id: string;
  totalValue: number;
  assets: Asset[];
};

export type Account = {
  id: string;
  number: string;
  balance: number;
  changeFromZero: number;
  changePercentFromZero: number;
};

export type Security = Asset & {
  isin: string;
  securityType: SecurityInstrumentType;
  quantity: number;
  currencyCode?: string;
};
