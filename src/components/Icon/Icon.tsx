import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TouchableOpacityBox, TouchableOpacityBoxProps } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import ArrowDown from '../../assets/icons/arrowDown.svg';
import ArrowUp from '../../assets/icons/arrowUp.svg';
import CheckRound from '../../assets/icons/checkRound.svg';
import ErrorRound from '../../assets/icons/errorRound.svg';
import Fem from '../../assets/icons/fem.svg';
import LeftArrow from '../../assets/icons/leftArrow.svg';
import Masc from '../../assets/icons/masc.svg';
import Rule from '../../assets/icons/rule.svg';
import Weight from '../../assets/icons/weight.svg';

export interface IconProps extends TouchableOpacityBoxProps {
  name: IconName;
  width?: number;
  height?: number;
  color?: ThemeColors;
}

export function Icon({
  name,
  height = 25,
  width = 25,
  color = 'backgroundContrast',
  onPress,
  ...touchableOpacityBoxProps
}: IconProps) {
  const SvgIcon = iconName[name];

  const { colors } = useAppTheme();

  if (onPress) {
    return (
      <TouchableOpacityBox
        testID={name}
        hitSlop={10}
        onPress={onPress}
        {...touchableOpacityBoxProps}>
        <SvgIcon
          width={width}
          height={height}
          style={{ color: colors[color] } as StyleProp<ViewStyle>}
        />
      </TouchableOpacityBox>
    );
  }

  return (
    <SvgIcon
      testID={name}
      width={width}
      height={height}
      style={{ color: colors[color] } as StyleProp<ViewStyle>}
    />
  );
}

const iconName = {
  femIcon: Fem,
  mascIcon: Masc,
  ruleIcon: Rule,
  weightIcon: Weight,
  leftArrowIcon: LeftArrow,
  ArrowUp: ArrowUp,
  ArrowDown: ArrowDown,
  successIcon: CheckRound,
  errorIcon: ErrorRound,
};

export type IconName = keyof typeof iconName;
