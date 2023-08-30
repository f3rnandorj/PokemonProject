import React from 'react';

import { PokemonDetails } from '@domain';

import { Text } from '@components';
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

      <Text regular mt="s26" textAlign="justify">
        {description}
      </Text>
    </>
  );
}
