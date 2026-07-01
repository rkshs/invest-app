import { PortfolioCurrency } from './convertPortfolioCurrency';

const percentFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyFormatters = {
  USD: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  CNY: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
} as const;

function normalizeSpaces(value: string): string {
  return value.replace(/\u00A0/g, ' ');
}

export function formatPortfolioMoney(
  amount: number,
  currency: string = 'USD',
): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} ${currency}`;
}

export function formatMoney(
  amount: number,
  currency: PortfolioCurrency = 'USD',
): string {
  return formatPortfolioMoney(amount, currency);
}

export function formatCurrencyBalance(
  amount: number,
  currency: keyof typeof currencyFormatters,
): string {
  return normalizeSpaces(currencyFormatters[currency].format(amount));
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${normalizeSpaces(percentFormatter.format(Math.abs(value)))}%`;
}

export function formatAccountDynamics(
  changeFromZero: number,
  changePercentFromZero: number,
  currency: PortfolioCurrency = 'USD',
): string {
  return `${formatMoney(changeFromZero, currency)} • ${formatPercent(changePercentFromZero)}`;
}

export function formatPositionQuantity(
  quantity: number,
  unitPrice: number,
  currency: PortfolioCurrency = 'USD',
): string {
  return `${quantity} шт × ${formatMoney(unitPrice, currency)}`;
}

export function formatPortfolioPositionMeta(
  quantity: number,
  portfolioShare: number,
  currency: string = 'USD',
): string {
  const share = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(portfolioShare);

  return `${quantity} шт · ${share}% · ${currency}`;
}

export function formatCashPositionMeta(
  portfolioShare: number,
  currency: string = 'USD',
): string {
  const share = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(portfolioShare);

  return `Деньги · ${share}% · ${currency}`;
}

export function formatPortfolioDataTimestamp(time: string): string {
  return `Данные на сегодня, ${time}`;
}

export function getPositionPortfolioShare(
  positionValue: number,
  portfolioTotalValue: number,
): number {
  if (portfolioTotalValue <= 0) {
    return 0;
  }

  return (positionValue / portfolioTotalValue) * 100;
}

export function formatPositionDynamics(
  changeAmount: number,
  changePercent: number,
  currency: PortfolioCurrency = 'USD',
): string {
  const amount =
    changeAmount > 0
      ? `+${formatMoney(changeAmount, currency)}`
      : formatMoney(changeAmount, currency);

  return `${amount} • ${formatPercent(changePercent)}`;
}
