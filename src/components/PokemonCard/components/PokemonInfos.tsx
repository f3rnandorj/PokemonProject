import React from 'react';

import { Pokemon } from '@domain';

import { Box, Text } from '@components';

import { PokemonTypes } from './PokemonTypes';

type Props = Pick<Pokemon, 'name' | 'types'>;

export function PokemonInfos({ name, types }: Props) {
  return (
    <Box flex={1} marginVertical="s6">
      <Box flexWrap="wrap" mb="s8">
        <Text preset="cardHeader" color="background" semiBold numberOfLines={1}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </Box>

      <PokemonTypes types={types} />
    </Box>
  );
}
