import {MD3LightTheme, configureFonts} from 'react-native-paper';
import {LightColors} from './colors';
import {customTypeScale} from './typography';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightColors,
  },
  fonts: configureFonts({config: customTypeScale}),
};
