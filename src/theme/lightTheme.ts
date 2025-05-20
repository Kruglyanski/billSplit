import {MD3LightTheme, configureFonts} from 'react-native-paper';
import {colors} from './colors';
import {customTypeScale} from './typography';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.violet,
    secondary: colors.yellow,
    background: colors.white,
    surface: colors.gray,
    onPrimary: colors.white,
    onSecondary: colors.black,
  },
  fonts: configureFonts({config: customTypeScale}),
};
