import { DarkTheme } from '@react-navigation/native';

import { colors } from '../../shared/theme';

export const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surfaceElevated,
    text: colors.text,
    border: colors.border,
    primary: colors.blue,
  },
};
