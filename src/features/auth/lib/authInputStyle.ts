import { Platform, TextStyle } from 'react-native';

export const authInputWebStyle = {
  outlineStyle: 'none',
  outlineWidth: 0,
} as unknown as TextStyle;

export const isAuthInputWeb = Platform.OS === 'web';
