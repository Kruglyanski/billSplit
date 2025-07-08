import {MD3Typescale, MD3Type} from 'react-native-paper/lib/typescript/types';

const defaultFont: Omit<MD3Type, 'fontSize' | 'lineHeight'> = {
  fontFamily: 'SourceSans3-Regular',
  fontWeight: '400',
  letterSpacing: 0,
};

const extraLightFont: Omit<MD3Type, 'fontSize' | 'lineHeight'> = {
  fontFamily: 'SourceSans3-ExtraLight',
  fontWeight: '400',
  letterSpacing: 0,
};

export const extraTypography = {
  extraLightLarge: {
    ...extraLightFont,
    fontSize: 16,
    lineHeight: 20,
  },
};

export const customTypeScale: MD3Typescale = {
  default: defaultFont,
  displayLarge: {
    ...defaultFont,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    ...defaultFont,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    ...defaultFont,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    ...defaultFont,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    ...defaultFont,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    ...defaultFont,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {...defaultFont, fontSize: 22, lineHeight: 28, letterSpacing: 0},
  titleMedium: {
    ...defaultFont,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    ...defaultFont,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelLarge: {
    ...defaultFont,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    ...defaultFont,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    ...defaultFont,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  bodyLarge: {...defaultFont, fontSize: 16, lineHeight: 24, letterSpacing: 0.5},
  bodyMedium: {
    ...defaultFont,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {...defaultFont, fontSize: 12, lineHeight: 16, letterSpacing: 0.4},
};
