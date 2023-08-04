import React from 'react';
import { Image } from 'react-native';

import { PokemonDetails } from '@domain';

import { Box, BoxProps, PokemonTypes, Text } from '@components';
import { useAppTheme } from '@hooks';

type Props = {
  pokemonName: string;
} & Pick<PokemonDetails, 'id' | 'types' | 'avatarURL'>;
export function HeaderPokemonDetails({
  pokemonName,
  avatarURL,
  id,
  types,
}: Props) {
  const { spacing } = useAppTheme();

  return (
    <>
      <Box {...$headerTitle}>
        <Text preset="headerLarge" color="background">
          {pokemonName}
        </Text>

        <Text preset="headerSmall" bold color="background" pt="s8">
          #{id.padStart(3, '0')}
        </Text>
      </Box>

      <PokemonTypes types={types} isDetailsScreen mt="s10" mb="s26" />

      <Image
        source={{
          uri: `${avatarURL}`,
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
    </>
  );
}

const $headerTitle: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 'ns28',
};