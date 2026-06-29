export const colors = {
  white: '#FFFFFF',
  black: '#000000',

  text: '#F3F5F8',
  textSecondary: '#8B95A8',
  textMuted: '#5C6778',

  blue: '#5BA4F5',
  blueLight: 'rgba(91, 164, 245, 0.18)',

  purple: '#A894FF',
  purpleLight: 'rgba(168, 148, 255, 0.18)',

  green: '#42D392',
  greenLight: 'rgba(66, 211, 146, 0.16)',
  red: '#FF7074',
  redLight: 'rgba(255, 112, 116, 0.16)',

  peach: '#2A3444',

  background: '#0B1017',
  surface: '#121820',
  surfaceSoft: '#171E28',
  surfaceElevated: '#1A2330',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
} as const;

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;
