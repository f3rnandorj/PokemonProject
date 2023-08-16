import React, { useEffect } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { usePokemonDetailsData } from '@domain';
import Orientation from 'react-native-orientation-locker';

import { Box, Screen } from '@components';
import { useSharedData } from '@hooks';
import { AppScreenProps } from '@routes';
import { ThemeColors } from '@theme';

import { HeaderPokemonDetails } from './components/HeaderPokemonDetails';
import { LoadingDetails } from './components/LoadingDetails';
import { PokemonBodyDetails } from './components/PokemonBodyDetails';
import { PokemonCharacteristicsDetails } from './components/PokemonCharacteristicsDetails/PokemonCharacteristicsDetails';
import { PokemonDescription } from './components/PokemonDescription';
import { PokemonEffectiveness } from './components/PokemonEffectiveness';
import { PokemonEvolutionsCard } from './components/PokemonEvolutionsCard';

const LAST_CORRECT_ID_INDEX = 1010;

export function PokemonDetailsScreen({
  route,
}: AppScreenProps<'PokemonDetailsScreen'>) {
  const { pokemonData } = useSharedData();
  const { id } = route.params;
  const { pokemonDetailsData, pokemonEvolutions, loadingPokemonDetailsData } =
    usePokemonDetailsData(id);

  const idIndex = id > LAST_CORRECT_ID_INDEX ? getCorrectIndex(id) : id - 1;

  const colorOfPokemon = pokemonData[idIndex]?.types[0] as ThemeColors;
  const pokemonName =
    (pokemonData[idIndex]?.name ?? '').charAt(0).toUpperCase() +
    (pokemonData[idIndex]?.name ?? '').slice(1);

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <>
      {loadingPokemonDetailsData ? (
        <LoadingDetails />
      ) : (
        <Screen scrollable color={colorOfPokemon} canGoBack>
          <HeaderPokemonDetails
            {...pokemonData[idIndex]}
            pokemonName={pokemonName}
          />

          <Box
            flex={1}
            bg="background"
            marginHorizontal="ns26"
            paddingHorizontal="s26"
            borderTopLeftRadius="s24"
            borderTopRightRadius="s24"
            style={{ marginTop: 150 }}>
            <Image
              source={{
                uri: `${pokemonData[idIndex]?.avatarURL}`,
              }}
              style={[$imageStyle]}
              resizeMode="contain"
            />

            <PokemonEvolutionsCard
              {...pokemonEvolutions}
              avatarURL={pokemonData[idIndex]?.avatarURL}
              colorOfPokemon={colorOfPokemon}
            />

            <PokemonDescription
              description={pokemonDetailsData?.description}
              colorOfPokemon={colorOfPokemon}
            />

            <PokemonBodyDetails {...pokemonData[idIndex]} />

            <PokemonCharacteristicsDetails
              {...pokemonDetailsData?.characteristicsGender}
              {...pokemonData[idIndex]?.characteristics}
            />

            <PokemonEffectiveness
              effectiveness={pokemonData[idIndex]?.effectiveness}
            />
          </Box>
        </Screen>
      )}
    </>
  );
}

const $imageStyle: StyleProp<ImageStyle> = {
  zIndex: 1,
  width: 200,
  height: 200,
  alignSelf: 'center',
  marginTop: -150,
};

function getCorrectIndex(id: number) {
  var correctIndex = (9 + id).toString();

  // eslint-disable-next-line radix
  return parseInt(correctIndex[0] + correctIndex.substring(2));
}
