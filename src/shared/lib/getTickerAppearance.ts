import { colors } from '../theme/colors';

const TICKER_BACKGROUND = colors.surfaceSoft;

const TICKER_TEXT_COLORS = [
  colors.blue,
  colors.blue,
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

  const paletteIndex = Math.abs(hash) % TICKER_TEXT_COLORS.length;

  return {
    backgroundColor: TICKER_BACKGROUND,
    color: TICKER_TEXT_COLORS[paletteIndex],
    label: ticker.slice(0, 2),
  };
}
