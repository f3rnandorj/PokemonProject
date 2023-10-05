import React from 'react';
import { Image } from 'react-native';

import { Pokemon } from '@domain';
import { useNetInfo } from '@react-native-community/netinfo';

import PokemonLogo from '../../../assets/brand/pokemonLogo.svg';
import { Box } from '../../Box/Box';

type Props = Pick<Pokemon, 'name'>;

export function PokemonAvatar({ name }: Props) {
  const { isConnected } = useNetInfo();

  return (
    <>
      {isConnected ? (
        <Image
          source={{
            uri: `https://projectpokemon.org/images/normal-sprite/${name}.gif`,
          }}
          style={{ height: 55, width: 55 }}
          resizeMode="contain"
        />
      ) : (
        <Box pr="s10">
          <PokemonLogo height={55} width={55} />
        </Box>
      )}
    </>
  );
}
