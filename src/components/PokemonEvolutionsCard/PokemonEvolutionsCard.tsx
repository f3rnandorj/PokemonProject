import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

import { Pokemon, PokemonEvolutions, pokemonUtils } from '@domain';

import { BoxProps } from '@components';
import { $shadowProps, ThemeColors } from '@theme';

import { LastEvolutionButton } from './components/LastEvolutionButton';
import { NextEvolutionButton } from './components/NextEvolutionButton';

export type PokemonEvolutionProps = Omit<PokemonEvolutions, 'hasEvolution'> & {
  usage: 'searchScreen' | 'detailsScreen';
  avatarURL?: Pokemon['avatarURL'];
  colorOfPokemon: ThemeColors;
  fetchEvolutionPokemonDetails: (evolutionName: string) => void;
};

export function PokemonEvolutionsCard(pokemon: PokemonEvolutionProps) {
  const $wrapperButtonMoreStyles: StyleProp<ViewStyle> = {
    borderRadius: 50,
    position: 'absolute',
    top: pokemon.usage === 'searchScreen' ? 55 : -35,
  };

  const $wrapperButton: BoxProps = {
    justifyContent: 'center',
    alignItems: 'center',
    height: pokemon.usage === 'searchScreen' ? 60 : 70,
    width: pokemon.usage === 'searchScreen' ? 60 : 70,
    backgroundColor: 'background',
    borderWidth: 2.5,
  };

  const $sizeImage: StyleProp<ImageStyle> = {
    height: pokemon.usage === 'searchScreen' ? 50 : 60,
    width: pokemon.usage === 'searchScreen' ? 50 : 60,
    borderRadius: 50,
  };

  const lastEvolutionName = pokemonUtils.adapterSomeNamesToUrlOfGif(
    pokemon?.lastEvolutionName,
  );

  const nextEvolutionName = pokemonUtils.adapterSomeNamesToUrlOfGif(
    pokemon?.nextEvolutionName,
  );

  return (
    <>
      {pokemon.hasLastEvolution && (
        <LastEvolutionButton
          usage={pokemon.usage}
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
          usage={pokemon.usage}
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
