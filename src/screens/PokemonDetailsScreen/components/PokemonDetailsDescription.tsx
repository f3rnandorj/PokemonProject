import React from 'react';
import { Platform } from 'react-native';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        {t(description)}
      </Text>
    </>
  );
}
