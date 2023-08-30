import React from 'react';

import { Box, BoxProps, Text } from '@components';

import { AnimatedBar } from './AnimatedBar';

export interface CharacteristicCardProps {
  label: string;
  index: number;
  count?: number;
  isTotalCardDetails?: boolean;
}
export function CharacteristicCard({
  label,
  index,
  count,
  isTotalCardDetails,
}: CharacteristicCardProps) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={'30%'}>
        <Text preset="paragraphLarge" medium>
          {label}
        </Text>
      </Box>

      <Box width={'10%'}>
        <Text medium>{count}</Text>
      </Box>

      <Box {...$barStyle} borderRadius="s24" bg="grayBar">
        <AnimatedBar
          count={count}
          index={index}
          isTotalCardDetails={isTotalCardDetails}
        />
      </Box>
    </Box>
  );
}

const $barStyle: BoxProps = {
  height: 5,
  width: '60%',
  alignSelf: 'center',
};
