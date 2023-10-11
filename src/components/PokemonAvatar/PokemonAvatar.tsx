import React, { memo, useState } from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Image,
  ImageStyle,
  StyleProp,
} from 'react-native';

import { pokemonUtils } from '@domain';
import { useNetInfo } from '@react-native-community/netinfo';

import { useAppTheme } from '@hooks';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';
import { Box } from '../Box/Box';

interface Props {
  name?: string;
  height: DimensionValue | undefined;
  width: DimensionValue | undefined;
  avatarURL?: string;
  style?: StyleProp<ImageStyle>;
}

function Avatar({ name, avatarURL, height, width, style }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useNetInfo();
  const { colors } = useAppTheme();

  if (!name && !avatarURL) {
    throw new Error(
      'You must pass a name or an avatarURL on PokemonAvatar component.',
    );
  }

  const adaptedGiftName = name
    ? pokemonUtils.adapterSomeNamesToUrlOfGif(name)
    : '';

  const differentURLCase =
    name === 'sirfetchd'
      ? 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/sirfetchd.gif'
      : `https://projectpokemon.org/images/normal-sprite/${adaptedGiftName}.gif`;

  const uri = avatarURL ? `${avatarURL}` : `${differentURLCase}`;

  return (
    <>
      {isConnected || isLoading ? (
        <>
          {isLoading && (
            <ActivityIndicator
              style={$loading}
              size="small"
              color={colors.primary}
            />
          )}
          <Image
            source={{
              uri,
            }}
            style={[{ height, width }, style]}
            onLoadEnd={() => setIsLoading(false)}
            resizeMode="contain"
          />
        </>
      ) : (
        <Box pr="s10">
          <PokemonLogo style={[{ height, width }, style]} />
        </Box>
      )}
    </>
  );
}

export const PokemonAvatar = memo(Avatar);

const $loading: StyleProp<ImageStyle> = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
