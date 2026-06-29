export type PortfolioCurrencyCode = 'RUB' | 'USD' | 'EUR' | 'CNY';

export type CashPosition = {
  id: string;
  currencyCode: PortfolioCurrencyCode;
  balance: number;
  portfolioValue: number;
};
