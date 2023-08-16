import React from 'react';
import { Image, StyleProp, ViewStyle } from 'react-native';

import { Pokemon, PokemonEvolutions } from '@domain';
import { masks } from '@utils';

import { BoxProps, TouchableOpacityBox } from '@components';
import { $shadowProps, ThemeColors } from '@theme';

type Props = Omit<PokemonEvolutions, 'hasEvolution'> &
  Pick<Pokemon, 'avatarURL'> & {
    colorOfPokemon: ThemeColors;
  };

export function PokemonEvolutionsCard(pokemon: Props) {
  const lastEvolutionName = masks.adapterSomeNamesToUrlOfGif(
    pokemon?.lastEvolutionName,
  );
  const nextEvolutionName = masks.adapterSomeNamesToUrlOfGif(
    pokemon?.nextEvolutionName,
  );

  return (
    <>
      {pokemon.hasLastEvolution && (
        <TouchableOpacityBox
          {...$wrapperButton}
          borderColor={pokemon.colorOfPokemon}
          style={[$wrapperButtonMoreStyles, $shadowProps, { left: 24 }]}>
          <Image
            source={{
              uri: `https://projectpokemon.org/images/normal-sprite/${lastEvolutionName}.gif`,
            }}
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode="contain"
          />
        </TouchableOpacityBox>
      )}

      {pokemon.hasNextEvolution && (
        <TouchableOpacityBox
          {...$wrapperButton}
          borderColor={pokemon.colorOfPokemon}
          style={[$wrapperButtonMoreStyles, $shadowProps, { right: 24 }]}>
          <Image
            source={{
              uri:
                nextEvolutionName === 'sirfetchd'
                  ? 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/sirfetchd.gif'
                  : `https://projectpokemon.org/images/normal-sprite/${nextEvolutionName}.gif`,
            }}
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode="contain"
          />
        </TouchableOpacityBox>
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
  borderWidth: 2,
};

const $wrapperButtonMoreStyles: StyleProp<ViewStyle> = {
  borderRadius: 50,
  position: 'absolute',

  top: -30,
};
