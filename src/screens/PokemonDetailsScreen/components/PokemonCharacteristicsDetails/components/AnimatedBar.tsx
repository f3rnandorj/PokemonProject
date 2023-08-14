import React, { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useAppTheme } from '@hooks';

import { CharacteristicCardProps } from './CharacteristicCard';

type Props = Pick<
  CharacteristicCardProps,
  'count' | 'index' | 'isTotalCardDetails'
>;

export function AnimatedBar({ count, index, isTotalCardDetails }: Props) {
  const { colors, borderRadii } = useAppTheme();
  let fillWidth = useSharedValue(0);

  const percent = 100;
  const totalBarWidth = index * percent;

  const animatedStyle = useAnimatedStyle(() => {
    const isTotalBarUpToMax =
      fillWidth.value > totalBarWidth && isTotalCardDetails;
    const isTotalBar = fillWidth.value <= totalBarWidth && isTotalCardDetails;
    const isNormalBarUpToMax = fillWidth.value > 100 && fillWidth.value < 260;

    function determinateCardWidth() {
      if (isTotalBarUpToMax) {
        return Math.min(fillWidth.value, 100);
      }
      if (isTotalBar) {
        return (fillWidth.value / totalBarWidth) * percent;
      }
      if (isNormalBarUpToMax) {
        return Math.min(fillWidth.value, 100);
      }
      return fillWidth.value;
    }

    const isWithinYellowRange =
      fillWidth.value >= 50 && fillWidth.value < 75 && !isTotalCardDetails;
    const isWithinGreenRange =
      fillWidth.value >= 75 && fillWidth.value <= 100 && !isTotalCardDetails;
    const isWithinBlueRange =
      fillWidth.value > 100 && fillWidth.value <= 200 && !isTotalCardDetails;
    const isWithinPurpleRangeNormal =
      fillWidth.value > 200 && !isTotalCardDetails;

    const isWithinYellowRangeTotalBar =
      fillWidth.value >= 300 && fillWidth.value < 450 && isTotalCardDetails;
    const isWithinGreenRangeTotalBar =
      fillWidth.value >= 450 && fillWidth.value <= 600 && isTotalCardDetails;
    const isWithinBlueRangeTotalBar =
      fillWidth.value > 600 && fillWidth.value <= 650 && isTotalCardDetails;
    const isWithinPurpleRangeNormalTotalBar =
      fillWidth.value > 650 && isTotalCardDetails;

    const determineBarColor = () => {
      if (isWithinYellowRange || isWithinYellowRangeTotalBar) {
        return colors.yellowBar;
      }
      if (isWithinGreenRange || isWithinGreenRangeTotalBar) {
        return colors.greenBar;
      }
      if (isWithinBlueRange || isWithinBlueRangeTotalBar) {
        return colors.blueBar;
      }
      if (isWithinPurpleRangeNormal || isWithinPurpleRangeNormalTotalBar) {
        return colors.purpleBar;
      }
      return colors.redBar;
    };

    const barColor = determineBarColor();
    const totalCardWidth = determinateCardWidth();

    const backgroundColor = interpolateColor(
      fillWidth.value,
      [0, 1],
      ['#F4F5F5', barColor],
    );

    return {
      height: 3,
      paddingVertical: 2,
      backgroundColor,
      width: `${totalCardWidth}%`,
      borderRadius: borderRadii.s24,
      borderWidth: 2,
      borderColor:
        barColor === colors.purpleBar ? colors.yellowBar : colors.background,
    };
  });

  useEffect(() => {
    fillWidth.value = withTiming(count!, {
      duration: 1500,
      easing: Easing.in(Easing.poly(3)),
    });
  }, [count, fillWidth]);

  return <Animated.View style={[animatedStyle]} />;
}
