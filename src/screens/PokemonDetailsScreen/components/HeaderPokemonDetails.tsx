import React from 'react';

import { Pokemon } from '@domain';

import { Box, BoxProps, MemoPokemonTypes, Text } from '@components';

type Props = {
  pokemonName: string;
} & Pick<Pokemon, 'id' | 'types'>;

export function HeaderPokemonDetails({ pokemonName, id, types }: Props) {
  return (
    <>
      <Box {...$headerTitle}>
        <Text preset="headerLarge" color="background">
          {pokemonName}
        </Text>

        <Text preset="headerSmall" bold color="background" pt="s8">
          # {String(id).padStart(4, '0')}
        </Text>
      </Box>

      <MemoPokemonTypes types={types} isDetailsScreen mt="s10" mb="s22" />
    </>
  );
}

const $headerTitle: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 'ns40',
};
