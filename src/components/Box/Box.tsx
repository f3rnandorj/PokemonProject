import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import {
  createBox,
  createRestyleComponent,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';

import { Theme } from '@theme';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = TouchableOpacityProps &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [spacing, backgroundColor, layout, border, spacingShorthand],
  TouchableOpacity,
);
