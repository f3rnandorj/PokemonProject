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
  children,
  bold = false,
  semiBold = false,
  medium = false,
  regular = false,
  preset = 'paragraphMedium',
  style,
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, semiBold, medium, regular);

  return (
    <SRText
      color="backgroundContrast"
      style={[style, $fontSize[preset], { fontFamily }]}
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
  | 'paragraphMediumDescription'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaptionSmall'
  | 'cardHeader'
  | 'cardMedium'
  | 'cardSmall'
  | 'tab';

export const $fontSize: Record<TextVariants, TextStyle> = {
  headerLarge: { fontSize: 36 },
  headerMedium: { fontSize: 24, lineHeight: 31.2 },
  headerSmall: { fontSize: 20, lineHeight: 24.2 },
  headerCaptionMedium: { fontSize: 18, lineHeight: 20 },
  headerCaptionSmall: { fontSize: 16 },

  paragraphLarge: { fontSize: 16 },
  paragraphMediumDescription: { fontSize: 16, lineHeight: 28 },
  paragraphMedium: { fontSize: 14, lineHeight: 24 },
  paragraphSmall: { fontSize: 14, lineHeight: 16 },
  paragraphCaptionSmall: { fontSize: 12, lineHeight: 12 },

  cardHeader: { fontSize: 16, lineHeight: 22 },
  cardMedium: { fontSize: 14, paddingVertical: 2 },
  cardSmall: { fontSize: 8, lineHeight: 28 },

  tab: { fontSize: 10 },
};

function getFontFamily(
  preset: TextVariants,
  bold: boolean,
  semiBold: boolean,
  medium: boolean,
  regular: boolean,
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
  } else {
    switch (true) {
      case bold:
        return $fontFamily.interBold;

      case semiBold:
        return $fontFamily.interSemiBold;

      case medium:
        return $fontFamily.SFMedium;

      case regular:
        return $fontFamily.SFRegular;

      default:
        return $fontFamily.interRegular;
    }
  }
}

export const $fontFamily = {
  interBold: 'Inter-Bold',
  interMedium: 'Inter-Regular',
  interRegular: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  SFMedium: 'SF-Pro-Display-Medium',
  SFRegular: 'SF-Pro-Display-Regular',
};
