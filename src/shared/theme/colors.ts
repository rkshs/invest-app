export const colors = {
  white: '#FFFFFF',
  text: '#08150C',
  textSecondary: 'rgba(8, 21, 12, 0.55)',
  purple: '#6C51FF',
  green: '#019979',
  greenLight: 'rgba(1, 153, 121, 0.14)',
  red: '#E5484D',
  redLight: 'rgba(229, 72, 77, 0.14)',
  peach: '#FFE2B4',
  purpleLight: 'rgba(108, 81, 255, 0.12)',
  background: '#FAFAFC',
  surface: '#F2F2F5',
  surfaceSoft: '#EBECF0',
  surfaceElevated: '#FFFFFF',
} as const;

export const shadows = {
  card: {
    shadowColor: '#08150C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;
