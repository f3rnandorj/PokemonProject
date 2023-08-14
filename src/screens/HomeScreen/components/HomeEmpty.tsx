import React from 'react';
import { Image } from 'react-native';

import { Box, Text } from '@components';

interface Props {
  error: boolean;
  loading: boolean;
}

export function HomeEmpty({ error }: Props) {
  if (error) {
    return (
      <Box alignSelf="center" height={180} width={'100%'} mt="ns40">
        <Image
          source={require('../../../assets/brand/pokeError.jpg')}
          style={{ height: 180, width: '100%' }}
          resizeMode="contain"
        />
        <Text preset="paragraphLarge" bold textAlign="center">
          Não foi possível carregar os pokemons, verifique sua conexão...
        </Text>
      </Box>
    );
  } else {
    return (
      <Box alignSelf="center" height={250} width={250} mt="ns40">
        <Image
          source={require('../../../assets/brand/pikachuGif.gif')}
          style={{ height: 250, width: 250, marginBottom: -28 }}
        />
        <Text preset="headerSmall" bold textAlign="center">
          Carregando...
        </Text>
      </Box>
    );
  }
}