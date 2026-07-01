export type PurchasedCurrency = 'USD' | 'EUR' | 'CNY';

export type PortfolioCurrencyCode = PurchasedCurrency;

export type CashPosition = {
  id: string;
  name: string;
  currencyCode: PortfolioCurrencyCode;
  balance: number;
  portfolioValue: number;
};
