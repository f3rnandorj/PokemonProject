import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TouchableOpacityBox, TouchableOpacityBoxProps } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import Fem from '../../assets/icons/fem.svg';
import LeftArrow from '../../assets/icons/leftArrow.svg';
import Masc from '../../assets/icons/masc.svg';
import Rule from '../../assets/icons/rule.svg';
import Weight from '../../assets/icons/weight.svg';

interface IconProps extends TouchableOpacityBoxProps {
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
  style,
  ...touchableOpacityBoxProps
}: IconProps) {
  const SvgIcon = iconName[name];

  const { colors } = useAppTheme();

  if (name === 'leftArrowIcon') {
    return (
      <TouchableOpacityBox
        style={[
          {
            alignSelf: 'flex-start',
          },
          style,
        ]}
        {...touchableOpacityBoxProps}>
        <SvgIcon
          width={width}
          height={height}
          style={
            {
              color: colors[color],
            } as StyleProp<ViewStyle>
          }
        />
      </TouchableOpacityBox>
    );
  }

  return (
    <SvgIcon
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
};

type IconName = keyof typeof iconName;
