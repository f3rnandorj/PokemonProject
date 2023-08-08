import React from 'react';

import { Box, BoxProps, Icon, Text } from '@components';

import { AnimatedBar } from './AnimatedBar';

export interface CharacteristicCardProps {
  label: string;
  index: number;
  count?: number;
  mascInfo?: number;
  femInfo?: number;
}
export function CharacteristicCard({
  label,
  index,
  femInfo,
  count,
  mascInfo,
}: CharacteristicCardProps) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={'25%'}>
        <Text preset="paragraphLarge" medium>
          {label}
        </Text>
      </Box>

      {femInfo && mascInfo && (
        <Box {...$mascAndFemWrapper}>
          <Box mr="s16" {...$mascAndFem}>
            <Icon name="mascIcon" color="mascIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s6">
              {mascInfo}%
            </Text>
          </Box>

          <Box ml="s16" {...$mascAndFem}>
            <Icon name="femIcon" color="femIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s2">
              {femInfo}%
            </Text>
          </Box>
        </Box>
      )}

      {count && (
        <>
          <Box width={'10%'}>
            <Text medium>{count}</Text>
          </Box>

          <Box {...$barStyle} borderRadius="s24" bg="grayBar">
            <AnimatedBar count={count} index={index} />
          </Box>
        </>
      )}
    </Box>
  );
}

const $barStyle: BoxProps = {
  height: 4,
  width: '60%',
  alignSelf: 'center',
};

const $mascAndFemWrapper: BoxProps = {
  width: '75%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const $mascAndFem: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
