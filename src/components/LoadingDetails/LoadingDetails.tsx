import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Box, Screen } from '@components';
import { useAppTheme } from '@hooks';
import { useToastService } from '@services';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';

interface Props {
  isError: boolean;
}

export function LoadingDetails({ isError }: Props) {
  const { colors } = useAppTheme();
  const { showToast } = useToastService();
  const navigation = useNavigation();

  if (isError) {
    navigation.goBack();
    showToast({
      message: 'Erro ao tentar carregar detalhes do pokemon.',
      type: 'error',
    });

    return null;
  }

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
