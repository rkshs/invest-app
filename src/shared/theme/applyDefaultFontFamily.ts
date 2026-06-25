import { Text, TextInput } from 'react-native';

import { typography } from './typography';

type ComponentWithDefaultProps = {
  defaultProps?: { style?: { fontFamily: string } };
};

export function applyDefaultFontFamily() {
  const fontFamily = typography.fontFamily.regular;

  const TextComponent = Text as typeof Text & ComponentWithDefaultProps;
  const TextInputComponent = TextInput as typeof TextInput & ComponentWithDefaultProps;

  TextComponent.defaultProps = TextComponent.defaultProps ?? {};
  TextComponent.defaultProps.style = { fontFamily };

  TextInputComponent.defaultProps = TextInputComponent.defaultProps ?? {};
  TextInputComponent.defaultProps.style = { fontFamily };
}
