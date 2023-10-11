import React from 'react';

import { Text } from '@components';
import { Pokemon } from '@domain';

type Props = Pick<Pokemon, 'effectiveness'>;

export function PokemonDetailsEffectiveness({ effectiveness }: Props) {
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
