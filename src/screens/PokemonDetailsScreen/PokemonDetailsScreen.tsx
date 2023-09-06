import React, { useEffect } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { usePokemonDetailsData } from '@domain';
import Orientation from 'react-native-orientation-locker';

import {
  Box,
  Screen,
  LoadingDetails,
  PokemonEvolutionsCard,
} from '@components';
import { AppScreenProps } from '@routes';
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

  const {
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    loadingPokemonDetailsData,
    fetchEvolutionPokemonDetailsData,
  } = usePokemonDetailsData(pokemonNameParm);

  const pokemonColor = pokemonBasicDetailsData?.types?.[0] as ThemeColors;

  const pokemonName =
    (pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
    (pokemonBasicDetailsData?.name ?? '').slice(1);

  function fetchEvolutionPokemonDetails(evolutionName: string) {
    fetchEvolutionPokemonDetailsData(evolutionName);
  }

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
        <Screen scrollable color={pokemonColor} canGoBack>
          <PokemonDetailsHeader
            {...pokemonBasicDetailsData}
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
                uri:
                  pokemonBasicDetailsData && pokemonBasicDetailsData.avatarURL
                    ? pokemonBasicDetailsData.avatarURL
                    : 'https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png?fit=512%2C512',
              }}
              style={[$imageStyle]}
              resizeMode="contain"
            />

            <PokemonEvolutionsCard
              {...pokemonEvolutionsData}
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
