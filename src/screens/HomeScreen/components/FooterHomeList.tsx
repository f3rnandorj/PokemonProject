import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, Text } from '@components';
import { useAppTheme } from '@hooks';

import PokemonLogo from '../../../assets/brand/pokemonLogo.svg';

interface Props {
  loadingPokemonData: boolean;
  hasData: boolean;
}

export function FooterHomeList({ loadingPokemonData, hasData }: Props) {
  const { colors } = useAppTheme();

  return (
    <Box alignItems="center" marginVertical="s16">
      {loadingPokemonData && hasData ? (
        <Box>
          <ActivityIndicator size="small" color={colors.backgroundContrast} />
          <Text preset="headerSmall" bold textAlign="center">
            Carregando...
          </Text>
        </Box>
      ) : (
        <PokemonLogo />
      )}
    </Box>
  );
}
