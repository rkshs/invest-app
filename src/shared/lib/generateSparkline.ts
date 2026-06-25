export type SparklineTrend = 'up' | 'down' | 'flat';

export function generateSparklinePoints(
  seed: string,
  trend: SparklineTrend,
  count = 14,
): number[] {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }

  const points: number[] = [];
  let value = trend === 'down' ? 0.72 : trend === 'up' ? 0.28 : 0.5;

  for (let index = 0; index < count; index += 1) {
    const noise = (((hash + index * 9301) % 100) / 100) * 0.1 - 0.05;
    const drift = trend === 'up' ? 0.045 : trend === 'down' ? -0.045 : 0;

    value = Math.min(0.92, Math.max(0.08, value + drift + noise));
    points.push(value);
  }

  if (trend === 'up') {
    points[points.length - 1] = Math.max(points[points.length - 1], 0.78);
  }

  if (trend === 'down') {
    points[points.length - 1] = Math.min(points[points.length - 1], 0.22);
  }

  return points;
}

export function getSparklineTrend(changeFromZero: number): SparklineTrend {
  if (changeFromZero > 0) {
    return 'up';
  }

  if (changeFromZero < 0) {
    return 'down';
  }

  return 'flat';
}
