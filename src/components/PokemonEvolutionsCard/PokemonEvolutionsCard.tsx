import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

import { Pokemon, PokemonEvolutions } from '@domain';
import { masks } from '@utils';

import { BoxProps } from '@components';
import { $shadowProps, ThemeColors } from '@theme';

import { LastEvolutionButton } from './components/LastEvolutionButton';
import { NextEvolutionButton } from './components/NextEvolutionButton';

export type PokemonEvolutionProps = Omit<PokemonEvolutions, 'hasEvolution'> &
  Pick<Pokemon, 'avatarURL'> & {
    colorOfPokemon: ThemeColors;
    fetchEvolutionPokemonDetails: (evolutionName: string) => void;
  };

export function PokemonEvolutionsCard(pokemon: PokemonEvolutionProps) {
  const lastEvolutionName = masks.adapterSomeNamesToUrlOfGif(
    pokemon?.lastEvolutionName,
  );

  const nextEvolutionName = masks.adapterSomeNamesToUrlOfGif(
    pokemon?.nextEvolutionName,
  );

  return (
    <>
      {pokemon.hasLastEvolution && (
        <LastEvolutionButton
          $sizeImage={$sizeImage}
          $wrapperButton={$wrapperButton}
          $wrapperButtonMoreStyles={$wrapperButtonMoreStyles}
          lastEvolutionName={lastEvolutionName!}
          fetchEvolutionPokemonDetails={pokemon.fetchEvolutionPokemonDetails}
          $shadowProps={$shadowProps}
          colorOfPokemon={pokemon.colorOfPokemon}
        />
      )}

      {pokemon.hasNextEvolution && (
        <NextEvolutionButton
          $sizeImage={$sizeImage}
          $wrapperButton={$wrapperButton}
          $wrapperButtonMoreStyles={$wrapperButtonMoreStyles}
          fetchEvolutionPokemonDetails={pokemon.fetchEvolutionPokemonDetails}
          $shadowProps={$shadowProps}
          nextEvolutionName={nextEvolutionName!}
          moreThanOneMidEvolutions={pokemon?.moreThanOneMidEvolutions}
          colorOfPokemon={pokemon.colorOfPokemon}
        />
      )}
    </>
  );
}

const $wrapperButton: BoxProps = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 70,
  width: 70,
  backgroundColor: 'background',
  borderWidth: 2.5,
};

const $wrapperButtonMoreStyles: StyleProp<ViewStyle> = {
  borderRadius: 50,
  position: 'absolute',
  top: -35,
};

const $sizeImage: StyleProp<ImageStyle> = {
  height: 60,
  width: 60,
  borderRadius: 50,
};
