import React from 'react';
import { Platform } from 'react-native';

import { Text } from '@components';
import { PokemonDetails } from '@domain';
import { ThemeColors } from '@theme';

type Props = Pick<PokemonDetails, 'description'> & {
  colorOfPokemon: ThemeColors;
};

export function PokemonDetailsDescription({
  description,
  colorOfPokemon,
}: Props) {
  return (
    <>
      <Text preset="headerMedium" bold color={colorOfPokemon}>
        Descrição
      </Text>

      <Text
        regular
        mt="s26"
        mb={Platform.OS === 'ios' ? 's40' : 's0'}
        textAlign="justify">
        {description}
      </Text>
    </>
  );
}
