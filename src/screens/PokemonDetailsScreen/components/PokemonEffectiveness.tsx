import React from 'react';

import { Pokemon } from '@domain';

import { Text } from '@components';

type Props = Pick<Pokemon, 'effectiveness'>;

export function PokemonEffectiveness({ effectiveness }: Props) {
  return (
    <>
      <Text preset="headerCaptionMedium" semiBold mb="s16">
        Pontos fortes e fracos
      </Text>

      <Text regular mb="s40" textAlign="justify">
        {effectiveness}
      </Text>
    </>
  );
}
