export type { Chat } from './chat';
export type { ChatMessage } from './chatMessage';
export type PortfolioTabId = 'favorites' | 'actual' | 'growth-decline' | 'momentum';

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
  tabIds: PortfolioTabId[];
};
