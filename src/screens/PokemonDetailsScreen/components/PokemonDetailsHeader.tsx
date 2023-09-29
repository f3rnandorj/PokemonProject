import React from 'react';

import { Pokemon, PokemonDetails } from '@domain';

import {
  Box,
  BoxProps,
  MemoPokemonTypes,
  Text,
  FavoriteButton,
} from '@components';

type Props = {
  pokemonName: string;
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
} & Pick<Pokemon, 'id' | 'types'>;

export function PokemonDetailsHeader({
  pokemonName,
  id,
  types,
  pokemonBasicDetailsData,
  pokemonDetailsData,
}: Props) {
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

      <Box {...$headerTypes}>
        <MemoPokemonTypes types={types} isDetailsScreen />

        <FavoriteButton
          pokemonBasicDetailsData={pokemonBasicDetailsData}
          pokemonDetailsData={pokemonDetailsData}
        />
      </Box>
    </>
  );
}

const $headerTitle: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 's8',
};

const $headerTypes: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 's10',
  mb: 's22',
};
