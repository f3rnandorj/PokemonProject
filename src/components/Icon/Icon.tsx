import React from 'react';

import Fem from '../../assets/icons/fem.svg';
import LeftArrow from '../../assets/icons/leftArrow.svg';
import Masc from '../../assets/icons/masc.svg';
import Rule from '../../assets/icons/rule.svg';
import Weight from '../../assets/icons/weight.svg';

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
}

export function Icon({ name, height = 25, width = 25 }: IconProps) {
  const SvgIcon = iconName[name];

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
