import React, { useEffect, useState } from 'react';

import { pokemonDetailsService, PokemonDetails } from '@domain';

import { Box, Screen, Text } from '@components';
import { ThemeColors } from '@theme';

import { HeaderPokemonDetails } from './components/HeaderPokemonDetails';
import { LoadingDetails } from './components/LoadingDetails';
import { PokemonBodyDetails } from './components/PokemonBodyDetails';
import { PokemonCharacteristicsDetails } from './components/PokemonCharacteristicsDetails';

export function PokemonDetailsScreen() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const colorOfPokemon = pokemonDetails?.types[0] as ThemeColors;
  const pokemonName =
    (pokemonDetails?.name ?? '').charAt(0).toUpperCase() +
    (pokemonDetails?.name ?? '').slice(1);

  useEffect(() => {
    setIsLoading(true);

    pokemonDetailsService
      .getList()
      .then(pokemon => {
        setPokemonDetails(pokemon);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingDetails />
      ) : (
        <Screen scrollable color={colorOfPokemon} canGoBack>
          <HeaderPokemonDetails
            {...pokemonDetails!}
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

            <Text regular mt="s26">
              {pokemonDetails?.description}
            </Text>

            <PokemonBodyDetails {...pokemonDetails!} mt="s32" />

            <PokemonCharacteristicsDetails
              {...pokemonDetails?.characteristics!}
            />

            <Text preset="headerCaptionMedium" semiBold mb="s16">
              Pontos fortes e fracos
            </Text>

            <Text regular mb="s40">
              {pokemonDetails?.effectiveness}
            </Text>
          </Box>
        </Screen>
      )}
    </>
  );
}
