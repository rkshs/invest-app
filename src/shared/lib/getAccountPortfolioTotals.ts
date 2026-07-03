import { PortfolioDisplayCurrency, toPortfolioCurrency } from './convertPortfolioCurrency';
import {
  getPortfolioTotal,
  getPortfolioTotalInDisplayCurrency,
} from './mapPortfolioRow';
import { getCurrenciesForAccount } from '../../screens/HomeScreen/data/mockAccountCurrencies';
import { getSecuritiesForAccount } from '../../screens/HomeScreen/data/mockAccountSecurities';
import { CashPosition } from '../../types/portfolioCash';

function getCashPositionsForAccount(accountId: string): CashPosition[] {
  return getCurrenciesForAccount(accountId).map((currency) => ({
    id: `cash-${currency.id}`,
    name: currency.name,
    currencyCode: currency.code,
    balance: currency.balance,
    portfolioValue: currency.balance,
  }));
}

export function getAccountPortfolioShareTotal(accountId: string): number {
  return getPortfolioTotal(
    getSecuritiesForAccount(accountId),
    getCashPositionsForAccount(accountId),
  );
}

export function getAccountPortfolioTotalInCurrency(
  accountId: string,
  displayCurrency: PortfolioDisplayCurrency,
): number {
  return getPortfolioTotalInDisplayCurrency(
    getSecuritiesForAccount(accountId),
    getCashPositionsForAccount(accountId),
    displayCurrency,
  );
}

export function getAccountPortfolioTotalInAccountCurrency(
  accountId: string,
  accountCurrencyCode?: string,
): number {
  return getAccountPortfolioTotalInCurrency(
    accountId,
    toPortfolioCurrency(accountCurrencyCode),
  );
}
