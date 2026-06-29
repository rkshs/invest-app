import { getPositionPortfolioShare } from './formatFinance';
import { AccountCurrency } from '../../types/accountCurrency';
import { AccountPosition } from '../../types/accountPosition';
import { CashPosition } from '../../types/portfolioCash';
import { PortfolioRowData } from '../../types/portfolioRow';
import { Security } from '../../types';

export function mapAccountPositionToPortfolioRow(
  position: AccountPosition,
  portfolioTotalValue: number,
): PortfolioRowData {
  const totalValue = position.quantity * position.unitPrice;

  return {
    id: position.id,
    kind: 'security',
    name: position.name,
    ticker: position.ticker,
    isin: position.isin,
    securityType: position.securityType,
    quantity: position.quantity,
    portfolioShare: getPositionPortfolioShare(totalValue, portfolioTotalValue),
    totalValue,
    currencyCode: position.currencyCode,
  };
}

export function mapSecurityToPortfolioRow(
  security: Security,
  portfolioTotalValue: number,
): PortfolioRowData {
  return {
    id: security.id,
    kind: 'security',
    name: security.name,
    ticker: security.ticker,
    isin: security.isin,
    securityType: security.securityType,
    quantity: security.quantity,
    portfolioShare: getPositionPortfolioShare(security.price, portfolioTotalValue),
    totalValue: security.price,
    currencyCode: security.currencyCode,
  };
}

export function mapCashToPortfolioRow(
  cash: CashPosition,
  portfolioTotalValue: number,
): PortfolioRowData {
  return {
    id: cash.id,
    kind: 'cash',
    name: 'Денежные средства',
    ticker: cash.currencyCode,
    isin: '',
    quantity: 0,
    portfolioShare: getPositionPortfolioShare(
      cash.portfolioValue,
      portfolioTotalValue,
    ),
    totalValue: cash.balance,
    currencyCode: cash.currencyCode,
  };
}

export function mapAccountCurrencyToPortfolioRow(
  currency: AccountCurrency,
  portfolioTotalValue: number,
): PortfolioRowData {
  return {
    id: `cash-${currency.id}`,
    kind: 'cash',
    name: 'Денежные средства',
    ticker: currency.code,
    isin: '',
    quantity: 0,
    portfolioShare: getPositionPortfolioShare(
      currency.balance,
      portfolioTotalValue,
    ),
    totalValue: currency.balance,
    currencyCode: currency.code,
  };
}

export function getSecuritiesPortfolioTotal(securities: Security[]): number {
  return securities.reduce((total, security) => total + security.price, 0);
}

export function getPortfolioTotal(
  securities: Security[],
  cashPositions: CashPosition[],
): number {
  return (
    getSecuritiesPortfolioTotal(securities) +
    cashPositions.reduce((total, position) => total + position.portfolioValue, 0)
  );
}
