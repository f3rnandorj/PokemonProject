import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { Pokemon } from '@domain';

import { Box, BoxProps, PokemonTypes, Text } from '@components';
import { useAppTheme } from '@hooks';

type Props = {
  pokemonName: string;
} & Pick<Pokemon, 'id' | 'types' | 'avatarURL'>;

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
          #{String(id).padStart(3, '0')}
        </Text>
      </Box>

      <PokemonTypes types={types} isDetailsScreen mt="s10" mb="s22" />

      <Image
        source={{
          uri: `${avatarURL}`,
        }}
        style={[{ marginBottom: spacing.ns40 }, $imageStyle]}
        resizeMode="contain"
      />
    </>
  );
}

const $headerTitle: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 'ns40',
};

const $imageStyle: StyleProp<ImageStyle> = {
  zIndex: 1,
  width: 200,
  height: 200,
  alignSelf: 'center',
};
