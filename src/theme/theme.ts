import { ViewStyle } from 'react-native';

import { createTheme } from '@shopify/restyle';

export const palette = {
  bug: '#8CB230',
  bugLight: '#8BD674',

  dark: '#58575F',
  darkLight: '#6F6E78',

  dragon: '#0F6AC0',
  dragonLight: '#7383B9',

  electric: '#F2CB55',
  electricLight: '#EED535',

  fairy: '#ED6EC7',
  fairyLight: '#EBA8C3',

  fighting: '#D04164',
  fightingLight: '#EB4971',

  fire: '#FD7D24',
  fireLight: '#FFA756',

  flying: '#748FC9',
  flyingLight: '#83A2E3',

  ghost: '#556AAE',
  ghostLight: '#8571BE',

  grass: '#62B957',
  grassLight: '#8BBE8A',

  ground: '#DD7748',
  groundLight: '#F78551',

  ice: '#61CEC0',
  iceLight: '#91D8DF',

  normal: '#9DA0AA',
  normalLight: '#B5B9C4',

  poison: '#A552CC',
  poisonLight: '#9F6E97',

  psychic: '#EA5D60',
  psychicLight: '#FF6568',

  rock: '#BAAB82',
  rockLight: '#D4C294',

  steel: '#417D9A',
  steelLight: '#4C91B2',

  water: '#4A90DA',
  waterLight: '#58ABF6',

  redDark: '#FB6C6C',
  redLight: '#F0729F',
  green: '#48D0B0',
  blue: '#6C79DB',
  purple: '#A552CC',
  yellow: '#FFFF00',

  black: '#303943',
  blackMedium: '#767676',
  blackLight: '#F2F2F2',
  gray: '#494949',
  grayLight: '#F4F5F5',
  white: '#FFFFFF',
};

export const theme = createTheme({
  colors: {
    ...palette,
    background: palette.white,
    backgroundContrast: palette.black,
    backgroundContrastLight: palette.blackLight,

    primary: palette.gray,
    secondary: palette.blackMedium,

    grayBar: palette.grayLight,
    redBar: palette.redDark,
    greenBar: palette.green,
    purpleBar: palette.purple,
    blueBar: palette.blue,
    yellowBar: palette.yellow,
    mascIcon: palette.blue,
    femIcon: palette.redLight,

    success: palette.green,
    error: palette.redDark,
  },
  spacing: {
    ns40: -40,
    ns30: -30,
    ns28: -28,
    ns26: -26,
    ns16: -16,
    ns12: -12,
    s0: 0,
    s2: 2,
    s4: 4,
    s6: 6,
    s8: 8,
    s10: 10,
    s12: 12,
    s16: 16,
    s20: 20,
    s22: 22,
    s24: 24,
    s26: 26,
    s32: 32,
    s40: 40,
  },
  borderRadii: {
    s6: 8,
    s14: 14,
    s24: 24,
    s50: 50,
  },
  textVariants: {
    defaults: {},
  },
});

export const $shadowProps: ViewStyle = {
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: -3 },
};

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];
