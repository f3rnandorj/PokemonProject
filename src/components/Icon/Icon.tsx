import React from 'react';
import { Pressable } from 'react-native';

import Fem from '../../assets/icons/fem.svg';
import LeftArrow from '../../assets/icons/leftArrow.svg';
import Masc from '../../assets/icons/masc.svg';
import Rule from '../../assets/icons/rule.svg';
import Weight from '../../assets/icons/weight.svg';

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  onPress: () => void;
}

export function Icon({ name, height = 25, width = 25 }: IconProps) {
  const SvgIcon = iconName[name];

  function goBack() {
    //TODO:
  }

  if (name === 'leftArrowIcon') {
    <Pressable onPress={goBack}>
      <SvgIcon width={width} height={height} />
    </Pressable>;
  }

  return <SvgIcon width={width} height={height} />;
}

const iconName = {
  femIcon: Fem,
  mascIcon: Masc,
  ruleIcon: Rule,
  weightIcon: Weight,
  leftArrowIcon: LeftArrow,
};

type IconName = keyof typeof iconName;
