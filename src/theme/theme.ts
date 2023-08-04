import { createTheme } from '@shopify/restyle';

export const palette = {
  bug: '#8CB230',
  bugLight: '#8BD674',

  dark: '#58575F',
  darkLight: '#6F6E78',

  dragon: '#0F6AC0',
  dragonLight: '#7383B9',

  electric: '#FFCE4B',
  electricLight: '#FFE97E',

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

  black: '#303943',
  blackMedium: '#767676',
  blackLight: '#F2F2F2',
  gray: '#494949',
  grayLight: '#F4F5F5',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    ...palette,
    background: palette.white,
    backgroundContrast: palette.black,
    backgroundContrastMedium: palette.blackMedium,
    backgroundContrastLight: palette.blackLight,

    backgroundHeader: palette.gray,

    grayBar: palette.grayLight,
    redBar: palette.redDark,
    greenBar: palette.green,
    mascIcon: palette.blue,
    femIcon: palette.redLight,
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
    s14: 14,
    s24: 24,
  },
  textVariants: {
    defaults: {},
  },
});

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];
export default theme;
