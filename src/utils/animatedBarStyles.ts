import { Theme } from '@theme';

interface BarColor {
  isWithinYellowRange?: boolean;
  isWithinYellowRangeTotalBar?: boolean;
  isWithinGreenRange?: boolean;
  isWithinGreenRangeTotalBar?: boolean;
  isWithinBlueRange?: boolean;
  isWithinBlueRangeTotalBar?: boolean;
  isWithinPurpleRangeNormal?: boolean;
  isWithinPurpleRangeNormalTotalBar?: boolean;
}

function determineBarColor(value: BarColor, colors: Theme['colors']) {
  if (value.isWithinYellowRange || value.isWithinYellowRangeTotalBar) {
    return colors.yellowBar;
  }
  if (value.isWithinGreenRange || value.isWithinGreenRangeTotalBar) {
    return colors.greenBar;
  }
  if (value.isWithinBlueRange || value.isWithinBlueRangeTotalBar) {
    return colors.blueBar;
  }
  if (
    value.isWithinPurpleRangeNormal ||
    value.isWithinPurpleRangeNormalTotalBar
  ) {
    return colors.purpleBar;
  }
  return colors.redBar;
}

export const animatedBarStyles = {
  determineBarColor,
};
