import React from 'react';

import {
  Box,
  BoxProps,
  MemoPokemonTypes,
  Text,
  FavoriteButton,
} from '@components';
import { Pokemon, PokemonDetails } from '@domain';
import { FavoritePokemon } from '@services';

type Props = {
  pokemonName: string;
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
  allFavoritePokemons: FavoritePokemon[] | null;
} & Pick<Pokemon, 'id' | 'types'>;

export function PokemonDetailsHeader({
  pokemonName,
  id,
  types,
  pokemonBasicDetailsData,
  pokemonDetailsData,
  allFavoritePokemons,
}: Props) {
  const isFavorite = allFavoritePokemons?.some(pokemon => pokemon.id === id);

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
          isFavorite={isFavorite}
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
