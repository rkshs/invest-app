import { SecurityInstrumentType } from '../../types/accountPosition';

const SECURITY_TYPE_LABELS: Record<SecurityInstrumentType, string> = {
  stock: 'Акция',
  bond: 'Облигация',
  future: 'Фьючерс',
  etf: 'ETF',
};

export function getSecurityTypeLabel(type: SecurityInstrumentType): string {
  return SECURITY_TYPE_LABELS[type];
}
