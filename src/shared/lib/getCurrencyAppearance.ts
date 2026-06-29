import { colors } from '../theme/colors';

export function getCurrencyAppearance(currencyCode: string): {
  backgroundColor: string;
  color: string;
  label: string;
} {
  return {
    backgroundColor: colors.surfaceSoft,
    color: colors.green,
    label: currencyCode,
  };
}
