import {
  convertPortfolioAmount,
  convertPurchasedCurrencyAmount,
  convertToUsd,
  PortfolioDisplayCurrency,
  toPortfolioCurrency,
} from './convertPortfolioCurrency';
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
    unitPrice: position.unitPrice,
    changePercent: position.changePercent,
    portfolioShare: getPositionPortfolioShare(
      convertToUsd(totalValue, position.currencyCode),
      portfolioTotalValue,
    ),
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
    unitPrice:
      security.quantity > 0 ? security.price / security.quantity : 0,
    changePercent: security.changePercent,
    portfolioShare: getPositionPortfolioShare(
      convertToUsd(security.price, security.currencyCode),
      portfolioTotalValue,
    ),
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
    name: cash.name,
    ticker: cash.currencyCode,
    isin: '',
    quantity: cash.balance,
    portfolioShare: getPositionPortfolioShare(
      convertToUsd(cash.portfolioValue, cash.currencyCode),
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
    name: currency.name,
    ticker: currency.code,
    isin: '',
    quantity: currency.balance,
    portfolioShare: getPositionPortfolioShare(
      convertToUsd(currency.balance, currency.code),
      portfolioTotalValue,
    ),
    totalValue: currency.balance,
    currencyCode: currency.code,
  };
}

export function getSecuritiesPortfolioTotal(securities: Security[]): number {
  return securities.reduce(
    (total, security) =>
      total + convertToUsd(security.price, security.currencyCode),
    0,
  );
}

export function getPortfolioTotal(
  securities: Security[],
  cashPositions: CashPosition[],
): number {
  const securitiesTotal = getSecuritiesPortfolioTotal(securities);
  const cashTotal = cashPositions.reduce(
    (total, position) =>
      total + convertToUsd(position.portfolioValue, position.currencyCode),
    0,
  );

  return securitiesTotal + cashTotal;
}

export function getPortfolioTotalInDisplayCurrency(
  securities: Security[],
  cashPositions: CashPosition[],
  displayCurrency: PortfolioDisplayCurrency,
): number {
  const securitiesTotal = securities.reduce(
    (total, security) =>
      total +
      convertPortfolioAmount(
        security.price,
        toPortfolioCurrency(security.currencyCode),
        displayCurrency,
      ),
    0,
  );
  const cashTotal = cashPositions.reduce(
    (total, position) =>
      total +
      convertPurchasedCurrencyAmount(
        position.portfolioValue,
        position.currencyCode,
        displayCurrency,
      ),
    0,
  );

  return securitiesTotal + cashTotal;
}
