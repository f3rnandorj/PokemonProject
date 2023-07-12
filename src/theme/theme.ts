import { createTheme } from '@shopify/restyle';

const palette = {
  bug: '#8CB230',
  bugLight: '#8BD674',

  dark: '#58575F',
  darkLight: '#6F6E78',

  dragon: '#0F6AC0',
  dragonLight: '#7383B9',

  electric: '#EED535',
  electricLight: '#F2CB55',

  fairy: '#ED6EC7',
  fairyLight: '#ED6EC7',

  fighting: '#D04164',
  fightingLight: '#D04164',

  fire: '#FD7D24',
  fireLight: '#FD7D24',

  flying: '#748FC9',
  flyingLight: '#748FC9',

  ghost: '#556AAE',
  ghostLight: '#556AAE',

  grass: '#62B957',
  grassLight: '#62B957',

  ground: '#DD7748',
  groundLight: '#DD7748',

  ice: '#61CEC0',
  iceLight: '#61CEC0',

  normal: '#9DA0AA',
  normalLight: '#9DA0AA',

  poison: '#A552CC',
  poisonLight: '#A552CC',

  psychic: '#EA5D60',
  psychicLight: '#EA5D60',

  rock: '#BAAB82',
  rockLight: '#BAAB82',

  steel: '#417D9A',
  steelLight: '#417D9A',

  water: '#4A90DA',
  waterLight: '#4A90DA',

  redDark: '#FB6C6C',
  redLight: '#F0729F',
  green: '#48D0B0',
  blue: '#6C79DB',

  black: '#303943',
  blackLight: '#303943',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    ...palette,
    primary: palette.white,
    primaryContrast: palette.black,
    primaryContrastLight: palette.blackLight,

    redBar: palette.redDark,
    greenBar: palette.green,
    mascIcon: palette.blue,
    femIcon: palette.redLight,
  },
  spacing: {
    s2: 2,
    s8: 8,
    s10: 10,
    s12: 12,
    s16: 16,
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
