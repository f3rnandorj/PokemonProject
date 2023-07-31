import React from 'react';
import { TextStyle } from 'react-native';

import { createText } from '@shopify/restyle';

import { Theme } from '@theme';

const SRText = createText<Theme>();
export type SRTextProps = React.ComponentProps<typeof SRText>;

export interface TextProps extends SRTextProps {
  preset?: TextVariants;
  bold?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  regular?: boolean;
}

export function Text({
  preset = 'paragraphMedium',
  children,
  bold,
  semiBold,
  medium,
  regular,
  style,
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, semiBold, medium, regular);

  return (
    <SRText
      color="backgroundContrast"
      style={[$fontSize[preset], { fontFamily }, style]}
      {...sRTextProps}>
      {children}
    </SRText>
  );
}

type TextVariants =
  | 'headerLarge'
  | 'headerMedium'
  | 'headerSmall'
  | 'headerCaptionMedium'
  | 'headerCaptionSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaptionSmall'
  | 'cardMedium'
  | 'cardSmall';

const $fontSize: Record<TextVariants, TextStyle> = {
  headerLarge: { fontSize: 36, lineHeight: 43.57 },
  headerMedium: { fontSize: 24, lineHeight: 31.2 },
  headerSmall: { fontSize: 20, lineHeight: 24.2 },
  headerCaptionMedium: { fontSize: 16, lineHeight: 28 },
  headerCaptionSmall: { fontSize: 14, lineHeight: 14 },

  paragraphLarge: { fontSize: 14, lineHeight: 28 },
  paragraphMedium: { fontSize: 14, lineHeight: 24 },
  paragraphSmall: { fontSize: 14, lineHeight: 16 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 12 },

  cardMedium: { fontSize: 12, lineHeight: 28 },
  cardSmall: { fontSize: 8, lineHeight: 28 },
};

function getFontFamily(
  preset: TextVariants,
  bold?: boolean,
  medium?: boolean,
  regular?: boolean,
  semiBold?: boolean,
) {
  if (
    preset === 'headerLarge' ||
    preset === 'headerMedium' ||
    preset === 'headerSmall' ||
    preset === 'headerCaptionMedium' ||
    preset === 'headerCaptionSmall'
  ) {
    switch (true) {
      case bold:
        return $fontFamily.interBold;

      case semiBold:
        return $fontFamily.interSemiBold;

      case medium:
        return $fontFamily.interMedium;

      case regular:
        return $fontFamily.interRegular;
    }
  }

  switch (true) {
    case medium:
      return $fontFamily.SFMedium;

    case regular:
      return $fontFamily.SFRegular;

    default:
      return $fontFamily.interRegular;
  }
}

export const $fontFamily = {
  interBold: 'Inter-Bold',
  interMedium: 'Inter-SemiBold',
  interRegular: 'Inter-Medium',
  interSemiBold: 'Inter-Regular',
  SFMedium: 'SF-Pro-Display-Medium',
  SFRegular: 'SF-Pro-Display-Regular',
};
