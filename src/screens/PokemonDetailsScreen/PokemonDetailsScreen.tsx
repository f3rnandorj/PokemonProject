import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { pokemonDetailsService, PokemonDetails } from '@domain';

import { Box, PokemonTypes, Screen, Text } from '@components';
import { useAppTheme, useAppSafeArea } from '@hooks';
import { ThemeColors } from '@theme';

import { PokemonBodyDetails } from './components/PokemonBodyDetails';

export function PokemonDetailsScreen() {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetails['details']>();
  const [isLoading, setIsLoading] = useState(true);

  const { colors, spacing } = useAppTheme();
  const { top } = useAppSafeArea();

  const colorOfPokemon = pokemonDetails?.types[0] as ThemeColors;
  const pokemonName =
    (pokemonDetails?.name ?? '').charAt(0).toUpperCase() +
    (pokemonDetails?.name ?? '').slice(1);

  useEffect(() => {
    setIsLoading(true);

    pokemonDetailsService
      .getList()
      .then(pokemon => {
        setPokemonDetails(pokemon.details);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Screen scrollable color={colorOfPokemon} canGoBack>
      {isLoading ? (
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: -top }}>
          <ActivityIndicator size={50} color={colors.background} />
        </Box>
      ) : (
        <Box flex={1}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text preset="headerLarge" color="background">
              {pokemonName}
            </Text>
            <Text preset="headerSmall" bold color="background">
              #{pokemonDetails?.id.padStart(3, '0')}
            </Text>
          </Box>

          <PokemonTypes
            types={pokemonDetails!.types}
            isDetailsScreen
            mt="s10"
            mb="s26"
          />

          <Image
            source={{
              uri: `${pokemonDetails?.avatarURL}`,
            }}
            style={{
              zIndex: 1,
              width: 190,
              height: 190,
              marginBottom: spacing.ns40,
              alignSelf: 'center',
            }}
            resizeMode="contain"
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

            <Text regular mt="s40">
              {pokemonDetails?.description}
            </Text>

            <PokemonBodyDetails
              weight={pokemonDetails!.weight}
              height={pokemonDetails!.height}
              principalMove={pokemonDetails!.principalMove}
              mt="s32"
            />
          </Box>
        </Box>
      )}
    </Screen>
  );
}
