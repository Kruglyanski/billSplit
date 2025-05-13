import {MD3DarkTheme, configureFonts} from 'react-native-paper';
import {DarkColors} from './colors';
import {customTypeScale} from './typography';

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkColors,
  },
  fonts: configureFonts({config: customTypeScale}),
};
