import React from 'react';

import { Box, BoxProps, Icon, Text } from '@components';

export interface CharacteristicGenderCardProps {
  label: string;
  mascInfo?: number;
  femInfo?: number;
}

export function CharacteristicGenderCard({
  label,
  femInfo,
  mascInfo,
}: CharacteristicGenderCardProps) {
  console.log({ femInfo });
  console.log({ mascInfo });

  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={'30%'}>
        <Text preset="paragraphLarge" medium>
          {label}
        </Text>
      </Box>

      <Box {...$mascAndFemWrapper}>
        <Box mr="s16" {...$mascAndFem}>
          <Icon name="mascIcon" color="mascIcon" width={20} height={20} />
          <Text preset="paragraphMediumDescription" bold pl="s6">
            {mascInfo ?? 0}%
          </Text>
        </Box>

        <Box ml="s16" {...$mascAndFem}>
          <Icon name="femIcon" color="femIcon" width={20} height={20} />
          <Text preset="paragraphMediumDescription" bold pl="s2">
            {femInfo ?? 0}%
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

const $mascAndFemWrapper: BoxProps = {
  width: '70%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const $mascAndFem: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
