export type AccountPosition = {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  unitPrice: number;
  changeAmount: number;
  changePercent: number;
};

export type AccountPositionsSummary = {
  totalValue: number;
  totalChange: number;
};
