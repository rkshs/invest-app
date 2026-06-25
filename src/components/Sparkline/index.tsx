import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '../../shared/theme';
import { SparklineTrend } from '../../shared/lib/generateSparkline';

type SparklineProps = {
  points: number[];
  trend: SparklineTrend;
  width?: number;
  height?: number;
  showDot?: boolean;
};

const TREND_COLORS = {
  up: colors.green,
  down: colors.red,
  flat: colors.textSecondary,
} as const;

function buildSmoothPath(points: number[], width: number, height: number): string {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const padding = 6;

  const coords = points.map((point, index) => ({
    x: padding + (index / (points.length - 1)) * (width - padding * 2),
    y: padding + (1 - (point - min) / range) * (height - padding * 2),
  }));

  if (coords.length === 0) {
    return '';
  }

  let path = `M ${coords[0].x} ${coords[0].y}`;

  for (let index = 1; index < coords.length; index += 1) {
    const previous = coords[index - 1];
    const current = coords[index];
    const controlX = (previous.x + current.x) / 2;

    path += ` C ${controlX} ${previous.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`;
  }

  return path;
}

export function Sparkline({
  points,
  trend,
  width = 96,
  height = 88,
  showDot = true,
}: SparklineProps) {
  const strokeColor = TREND_COLORS[trend];
  const linePath = buildSmoothPath(points, width, height);
  const areaPath = `${linePath} L ${width - 6} ${height} L 6 ${height} Z`;
  const lastPoint = points[points.length - 1];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const padding = 6;
  const dotX = width - padding;
  const dotY = padding + (1 - (lastPoint - min) / range) * (height - padding * 2);
  const gradientId = `sparkline-${trend}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={strokeColor} stopOpacity={0.28} />
          <Stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill={`url(#${gradientId})`} />
      <Path
        d={linePath}
        stroke={strokeColor}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot ? <Circle cx={dotX} cy={dotY} r={3.5} fill={strokeColor} /> : null}
    </Svg>
  );
}
