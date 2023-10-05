import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, Screen } from '@components';
import { useAppTheme } from '@hooks';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';

export function LoadingDetails() {
  const { colors } = useAppTheme();

  return (
    <Screen canGoBack>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={50} color={colors.backgroundContrast} />
      </Box>

      <Box alignItems="center" style={{ paddingBottom: 100 }}>
        <PokemonLogo />
      </Box>
    </Screen>
  );
}
