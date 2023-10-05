import React from 'react';
import { DimensionValue, Image, ImageStyle, StyleProp } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';
import { Box } from '../Box/Box';

type Props = {
  name?: string;
  height: DimensionValue | undefined;
  width: DimensionValue | undefined;
  avatarURL?: string;
  style?: StyleProp<ImageStyle>;
};

export function PokemonAvatar({
  name,
  avatarURL,
  height,
  width,
  style,
}: Props) {
  const { isConnected } = useNetInfo();

  if (!name && !avatarURL) {
    throw new Error(
      'You must pass a name or an avatarURL on PokemonAvatar component.',
    );
  }

  const differentURLCase =
    name === 'sirfetchd'
      ? 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/sirfetchd.gif'
      : `https://projectpokemon.org/images/normal-sprite/${name}.gif`;

  const uri = avatarURL ? `${avatarURL}` : `${differentURLCase}`;

  return (
    <>
      {isConnected ? (
        <Image
          source={{
            uri,
          }}
          style={[{ height, width }, style]}
          resizeMode="contain"
        />
      ) : (
        <Box pr="s10">
          <PokemonLogo style={[{ height, width }, style]} />
        </Box>
      )}
    </>
  );
}
