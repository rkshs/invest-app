import { colors } from '../theme/colors';

const TICKER_COLORS = [
  colors.purpleLight,
  colors.peach,
  colors.greenLight,
  colors.redLight,
  'rgba(108, 81, 255, 0.2)',
] as const;

const TICKER_TEXT_COLORS = [
  colors.purple,
  colors.text,
  colors.green,
  colors.red,
  colors.purple,
] as const;

export function getTickerAppearance(ticker: string): {
  backgroundColor: string;
  color: string;
  label: string;
} {
  let hash = 0;

  for (let index = 0; index < ticker.length; index += 1) {
    hash = (hash << 5) - hash + ticker.charCodeAt(index);
    hash |= 0;
  }

  const paletteIndex = Math.abs(hash) % TICKER_COLORS.length;

  return {
    backgroundColor: TICKER_COLORS[paletteIndex],
    color: TICKER_TEXT_COLORS[paletteIndex],
    label: ticker.slice(0, 2),
  };
}
