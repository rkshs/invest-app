const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const currencyFormatters = {
  RUB: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  CNY: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  USD: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
} as const;

const percentFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function normalizeSpaces(value: string): string {
  return value.replace(/\u00A0/g, ' ');
}

export function formatMoney(amount: number): string {
  return normalizeSpaces(rubFormatter.format(amount));
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
): string {
  return `${formatMoney(changeFromZero)} • ${formatPercent(changePercentFromZero)}`;
}

export function formatPositionQuantity(quantity: number, unitPrice: number): string {
  return `${quantity} шт × ${formatMoney(unitPrice)}`;
}

export function formatPortfolioPositionMeta(
  quantity: number,
  portfolioShare: number,
  currency = 'RUB',
): string {
  const share = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(portfolioShare);

  return `${quantity} шт · ${share}% · ${currency}`;
}

export function formatCashPositionMeta(
  portfolioShare: number,
  currency = 'RUB',
): string {
  const share = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(portfolioShare);

  return `Деньги · ${share}% · ${currency}`;
}

export function formatPortfolioMoney(
  amount: number,
  currency = 'RUB',
): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} ${currency}`;
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
): string {
  const amount =
    changeAmount > 0 ? `+${formatMoney(changeAmount)}` : formatMoney(changeAmount);

  return `${amount} • ${formatPercent(changePercent)}`;
}
