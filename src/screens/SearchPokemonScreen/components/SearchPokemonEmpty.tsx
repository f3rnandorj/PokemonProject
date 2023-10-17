import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Box, LoadingDetails, Text } from '@components';

interface Props {
  loading: boolean;
}

export function SearchPokemonEmpty({ loading }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const { isConnected } = useNetInfo();

  if (!isConnected) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: tabBarHeight }}>
        <Text preset="paragraphLarge" bold textAlign="center">
          Sem conexão com a internet...
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
