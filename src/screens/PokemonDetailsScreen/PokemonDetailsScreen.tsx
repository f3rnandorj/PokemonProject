import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { pokemonDetailsService, PokemonDetails } from '@domain';

import { Box, Icon, PokemonTypes, Screen, Text } from '@components';
import { useAppTheme, useAppSafeArea } from '@hooks';
import { ThemeColors } from '@theme';

import { PokemonBodyDetails } from './components/PokemonBodyDetails';

export function PokemonDetailsScreen() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
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
        setPokemonDetails(pokemon);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading ? (
        <Screen color={colorOfPokemon} canGoBack>
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: -top }}>
            <ActivityIndicator size={50} color={colors.background} />
          </Box>
        </Screen>
      ) : (
        <Screen scrollable color={colorOfPokemon} canGoBack>
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

            <Text regular mt="s26">
              {pokemonDetails?.description}
            </Text>

            <PokemonBodyDetails
              weight={pokemonDetails!.weight}
              height={pokemonDetails!.height}
              principalMove={pokemonDetails!.principalMove}
              mt="s32"
            />

            <Box paddingVertical="s32">
              <Text preset="headerCaptionMedium" semiBold mb="s16">
                Suas características
              </Text>
              <CharacteristicCard
                label="Gênero"
                mascInfo={pokemonDetails?.characteristics.gender.masc}
                femInfo={pokemonDetails?.characteristics.gender.fem}
              />
              <CharacteristicCard
                label="Saúde"
                count={pokemonDetails?.characteristics.health}
              />
              <CharacteristicCard
                label="Ataque"
                count={pokemonDetails?.characteristics.attack}
              />
              <CharacteristicCard
                label="Defesa"
                count={pokemonDetails?.characteristics.defense}
              />
              <CharacteristicCard
                label="Vl. Ataque"
                count={pokemonDetails?.characteristics.atkSpeed}
              />
              <CharacteristicCard
                label="Vl. Defesa"
                count={pokemonDetails?.characteristics.defSpeed}
              />
              <CharacteristicCard
                label="Velocidade"
                count={pokemonDetails?.characteristics.speed}
              />
              <CharacteristicCard
                label="Total"
                count={pokemonDetails?.characteristics.total}
              />
            </Box>

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

interface CharacteristicCardProps {
  label: string;
  count?: number;
  mascInfo?: number;
  femInfo?: number;
}

function CharacteristicCard({
  label,
  femInfo,
  count,
  mascInfo,
}: CharacteristicCardProps) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={'25%'}>
        <Text preset="paragraphLarge" medium>
          {label}
        </Text>
      </Box>

      {femInfo && mascInfo && (
        <Box
          width={'75%'}
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <Box
            flexDirection="row"
            mr="s16"
            alignItems="center"
            justifyContent="center">
            <Icon name="mascIcon" color="mascIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s6">
              {mascInfo}%
            </Text>
          </Box>

          <Box
            flexDirection="row"
            ml="s16"
            alignItems="center"
            justifyContent="center">
            <Icon name="femIcon" color="femIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s2">
              {femInfo}%
            </Text>
          </Box>
        </Box>
      )}

      {count && (
        <>
          <Box width={'10%'}>
            <Text medium>{count}</Text>
          </Box>

          <Box width={'65%'}>
            <Box
              alignSelf="center"
              width={'90%'}
              height={4}
              borderRadius="s24"
              bg="grayBar"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
