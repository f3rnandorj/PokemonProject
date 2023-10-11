import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleProp } from 'react-native';

import Orientation from 'react-native-orientation-locker';

import {
  Box,
  Screen,
  LoadingDetails,
  PokemonEvolutionsCard,
  PokemonAvatar,
} from '@components';
import { usePokemonDetailsData } from '@domain';
import { AppScreenProps } from '@routes';
import { useFavoritePokemonsService } from '@services';
import { ThemeColors } from '@theme';

import { PokemonDetailsCharacteristics } from './components/PokemonCharacteristicsDetails/PokemonDetailsCharacteristics';
import { PokemonDetailsBody } from './components/PokemonDetailsBody';
import { PokemonDetailsDescription } from './components/PokemonDetailsDescription';
import { PokemonDetailsEffectiveness } from './components/PokemonDetailsEffectiveness';
import { PokemonDetailsHeader } from './components/PokemonDetailsHeader';

export function PokemonDetailsScreen({
  route,
}: AppScreenProps<'PokemonDetailsScreen'>) {
  const { pokemonName: pokemonNameParm } = route.params;
  const [pokemon, setPokemon] = useState(pokemonNameParm);

  const {
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    isLoading,
  } = usePokemonDetailsData(pokemon);
  const { getFavoritePokemonById, allFavoritePokemons } =
    useFavoritePokemonsService();

  const pokemonColor = pokemonBasicDetailsData?.types?.[0] as ThemeColors;
  const pokemonName =
    (pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
    (pokemonBasicDetailsData?.name ?? '').slice(1);

  function fetchEvolutionPokemonDetails(evolutionName: string) {
    setPokemon(evolutionName);
  }

  useEffect(() => {
    getFavoritePokemonById(pokemonBasicDetailsData?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonBasicDetailsData?.id]);

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <>
      {isLoading ||
      !pokemonBasicDetailsData ||
      !pokemonDetailsData ||
      !pokemonEvolutionsData ? (
        <LoadingDetails />
      ) : (
        <Screen scrollable color={pokemonColor} canGoBack>
          <PokemonDetailsHeader
            {...pokemonBasicDetailsData}
            pokemonName={pokemonName}
            pokemonBasicDetailsData={pokemonBasicDetailsData}
            pokemonDetailsData={pokemonDetailsData}
            allFavoritePokemons={allFavoritePokemons}
          />

          <Box
            flex={1}
            bg="background"
            marginHorizontal="ns26"
            paddingHorizontal="s26"
            borderTopLeftRadius="s24"
            borderTopRightRadius="s24"
            style={{ marginTop: 150 }}>
            <PokemonAvatar
              key={pokemonBasicDetailsData.avatarURL}
              width={0}
              height={0}
              avatarURL={pokemonBasicDetailsData.avatarURL}
              style={$imageStyle}
            />

            <PokemonEvolutionsCard
              {...pokemonEvolutionsData!}
              usage="detailsScreen"
              avatarURL={pokemonBasicDetailsData?.avatarURL}
              colorOfPokemon={pokemonColor}
              fetchEvolutionPokemonDetails={fetchEvolutionPokemonDetails}
            />

            <PokemonDetailsDescription
              description={pokemonDetailsData?.description}
              colorOfPokemon={pokemonColor}
            />

            <PokemonDetailsBody {...pokemonBasicDetailsData} />

            <PokemonDetailsCharacteristics
              {...pokemonDetailsData?.characteristicsGender}
              {...pokemonBasicDetailsData?.characteristics}
            />

            <PokemonDetailsEffectiveness
              effectiveness={pokemonBasicDetailsData?.effectiveness}
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
