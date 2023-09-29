import React from 'react';

import { Box, BoxProps, Text } from '@components';

import { AnimatedBar } from './components/AnimatedBar';

export interface CharacteristicCardProps {
  label: string;
  index: number;
  count?: number;
  isTotalCardDetails?: boolean;
  isFavoriteCard?: boolean;
}
export function CharacteristicCard({
  label,
  index,
  count,
  isTotalCardDetails,
  isFavoriteCard = false,
}: CharacteristicCardProps) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={isFavoriteCard ? '25%' : '30%'}>
        <Text
          preset="paragraphLarge"
          color={isFavoriteCard ? 'background' : 'backgroundContrast'}
          semiBold={isFavoriteCard ? true : false}>
          {label}
        </Text>
      </Box>

      <Box width={isFavoriteCard ? '15%' : '10%'}>
        <Text
          color={isFavoriteCard ? 'background' : 'backgroundContrast'}
          semiBold={isFavoriteCard ? true : false}>
          {count}
        </Text>
      </Box>

      <Box {...$barStyle} borderRadius="s24" bg="grayBar">
        <AnimatedBar
          count={count}
          index={index}
          isTotalCardDetails={isTotalCardDetails}
          isFavoriteCard={isFavoriteCard}
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
