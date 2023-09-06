import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Box, LoadingDetails, Text } from '@components';

interface Props {
  error: boolean | null;
  loading: boolean;
}

export function SearchPokemonEmpty({ error, loading }: Props) {
  const tabBarHeight = useBottomTabBarHeight();

  if (error) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: -tabBarHeight * 2 }}>
        <Image
          source={require('../../../assets/brand/pokeError.jpg')}
          style={{ height: 180, width: '100%' }}
          resizeMode="contain"
        />
        <Text preset="paragraphLarge" bold textAlign="center">
          Não foi possível carregar o pokemon, verifique sua conexão...
        </Text>
      </Box>
    );
  }

  if (loading) {
    return <LoadingDetails />;
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Image
        source={{
          uri: 'https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png?fit=512%2C512',
        }}
        style={[$imageStyle]}
        resizeMode="contain"
      />
    </Box>
  );
}

const $imageStyle: StyleProp<ImageStyle> = {
  zIndex: 1,
  width: 120,
  height: 120,
  alignSelf: 'center',
};
