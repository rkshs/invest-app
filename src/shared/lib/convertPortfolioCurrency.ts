export type PurchasedCurrency = 'USD' | 'EUR' | 'CNY';

export type PortfolioCurrency = 'USD' | 'EUR';

export type PortfolioDisplayCurrency = PortfolioCurrency;

const USD_TO_EUR = 0.93;

const USD_PER_UNIT: Record<PurchasedCurrency, number> = {
  USD: 1,
  EUR: 1 / USD_TO_EUR,
  CNY: 0.14,
};

export function convertToUsd(amount: number, fromCurrency: string): number {
  const rate = USD_PER_UNIT[fromCurrency as PurchasedCurrency];

  if (!rate) {
    return amount;
  }

  return Math.round(amount * rate);
}

export function convertPortfolioAmount(
  amount: number,
  fromCurrency: PortfolioCurrency,
  toCurrency: PortfolioCurrency,
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const amountInUsd = convertToUsd(amount, fromCurrency);

  if (toCurrency === 'USD') {
    return amountInUsd;
  }

  return Math.round(amountInUsd * USD_TO_EUR);
}

export function convertPurchasedCurrencyAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: PortfolioDisplayCurrency,
): number {
  const amountInUsd = convertToUsd(amount, fromCurrency);

  if (toCurrency === 'USD') {
    return amountInUsd;
  }

  return Math.round(amountInUsd * USD_TO_EUR);
}

export function toPortfolioCurrency(
  currency: string | undefined,
  fallback: PortfolioCurrency = 'USD',
): PortfolioCurrency {
  return currency === 'EUR' ? 'EUR' : fallback;
}

export function isPurchasedCurrency(currency: string): currency is PurchasedCurrency {
  return currency === 'USD' || currency === 'EUR' || currency === 'CNY';
}
