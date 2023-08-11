import React from 'react';

import { Box, Screen, Text } from '@components';
import { useSharedData } from '@hooks';
import { AppScreenProps } from '@routes';
import { ThemeColors } from '@theme';

import { HeaderPokemonDetails } from './components/HeaderPokemonDetails';
import { LoadingDetails } from './components/LoadingDetails';
import { PokemonBodyDetails } from './components/PokemonBodyDetails';
import { PokemonCharacteristicsDetails } from './components/PokemonCharacteristicsDetails/PokemonCharacteristicsDetails';

export function PokemonDetailsScreen({
  route,
}: AppScreenProps<'PokemonDetailsScreen'>) {
  const { pokemonData, loadingPokemonData } = useSharedData();
  const { id } = route.params;

  // console.log(pokemonData[1]);

  const colorOfPokemon = pokemonData[id]?.types[0] as ThemeColors;
  const pokemonName =
    (pokemonData[id]?.name ?? '').charAt(0).toUpperCase() +
    (pokemonData[id]?.name ?? '').slice(1);

  return (
    <>
      {loadingPokemonData ? (
        <LoadingDetails />
      ) : (
        <Screen scrollable color={colorOfPokemon} canGoBack>
          <HeaderPokemonDetails
            {...pokemonData[id]}
            pokemonName={pokemonName}
          />

          <Box
            flex={1}
            bg="background"
            marginHorizontal="ns26"
            paddingHorizontal="s26"
            borderTopLeftRadius="s24"
            borderTopRightRadius="s24">
            <Text preset="headerMedium" bold mt="s40" color={colorOfPokemon}>
              Descrição
            </Text>

            <Text regular mt="s26" textAlign="justify">
              {pokemonData[id]?.description}
            </Text>

            <PokemonBodyDetails {...pokemonData[id]} mt="s32" />

            <PokemonCharacteristicsDetails
              {...pokemonData[id]?.characteristics}
            />

            <Text preset="headerCaptionMedium" semiBold mb="s16">
              Pontos fortes e fracos
            </Text>

            <Text regular mb="s40" textAlign="justify">
              {pokemonData[id]?.effectiveness}
            </Text>
          </Box>
        </Screen>
      )}
    </>
  );
}
