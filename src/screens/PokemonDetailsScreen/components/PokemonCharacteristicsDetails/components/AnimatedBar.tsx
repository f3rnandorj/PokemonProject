import React, { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';

import { useAppTheme } from '@hooks';

import { CharacteristicCardProps } from './CharacteristicCard';

type Props = Pick<CharacteristicCardProps, 'count' | 'index'>;

export function AnimatedBar({ count, index }: Props) {
  const { colors, borderRadii } = useAppTheme();
  let fillWidth = useSharedValue(0);

  const percent = 100;
  const totalBarWidth = (index - 1) * percent;

  const animatedStyle = useAnimatedStyle(() => {
    const totalCardWidth =
      count! > 100
        ? (fillWidth.value / totalBarWidth) * percent
        : fillWidth.value;

    const barColor =
      totalCardWidth >= 50 && totalCardWidth < 100
        ? colors.greenBar
        : colors.redBar;

    const backgroundColor = interpolateColor(
      fillWidth.value,
      [0, 1],
      ['#F4F5F5', barColor],
    );

    return {
      height: 4,
      backgroundColor,
      width: `${totalCardWidth}%`,
      borderRadius: borderRadii.s24,
    };
  });

  useEffect(() => {
    fillWidth.value = withTiming(count!, {
      duration: 1000,
    });
  }, [count, fillWidth]);

  return <Animated.View style={[animatedStyle]} />;
}
