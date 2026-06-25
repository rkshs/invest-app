import { PortfolioTabId, Security } from '../../../types';

export const mockSecurities: Security[] = [
  {
    id: '1',
    name: 'Сбербанк',
    ticker: 'SBER',
    price: 28540,
    changePercent: 1.24,
    tabIds: ['favorites', 'actual', 'momentum'],
  },
  {
    id: '2',
    name: 'Газпром',
    ticker: 'GAZP',
    price: 12890,
    changePercent: -0.82,
    tabIds: ['actual', 'growth-decline'],
  },
  {
    id: '3',
    name: 'Лукойл',
    ticker: 'LKOH',
    price: 7120,
    changePercent: 2.15,
    tabIds: ['favorites', 'growth-decline', 'momentum'],
  },
  {
    id: '4',
    name: 'Яндекс',
    ticker: 'YDEX',
    price: 3980,
    changePercent: 3.42,
    tabIds: ['favorites', 'actual', 'momentum'],
  },
  {
    id: '5',
    name: 'Норникель',
    ticker: 'GMKN',
    price: 15420,
    changePercent: -1.67,
    tabIds: ['actual', 'growth-decline'],
  },
  {
    id: '6',
    name: 'Татнефть',
    ticker: 'TATN',
    price: 6210,
    changePercent: 0.95,
    tabIds: ['actual', 'growth-decline'],
  },
  {
    id: '7',
    name: 'МТС',
    ticker: 'MTSS',
    price: 2145,
    changePercent: -0.34,
    tabIds: ['growth-decline'],
  },
  {
    id: '8',
    name: 'ВТБ',
    ticker: 'VTBR',
    price: 9850,
    changePercent: 4.18,
    tabIds: ['momentum', 'growth-decline'],
  },
];

export function getSecuritiesForTab(
  securities: Security[],
  tabId: PortfolioTabId,
): Security[] {
  if (tabId === 'momentum') {
    return [...securities]
      .sort((left, right) => Math.abs(right.changePercent) - Math.abs(left.changePercent))
      .slice(0, 5);
  }

  if (tabId === 'growth-decline') {
    return [...securities]
      .filter((security) => security.changePercent !== 0)
      .sort((left, right) => right.changePercent - left.changePercent);
  }

  return securities.filter((security) => security.tabIds.includes(tabId));
}
