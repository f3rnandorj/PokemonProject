import React from 'react';

import { PokemonDetails } from '@domain';

import { Box, Text } from '@components';

import { CharacteristicCard } from './components/CharacteristicCard';

type Props = Pick<
  PokemonDetails['characteristics'],
  | 'gender'
  | 'atkSpeed'
  | 'attack'
  | 'defSpeed'
  | 'defense'
  | 'health'
  | 'speed'
  | 'total'
>;

export function PokemonCharacteristicsDetails(details: Props) {
  return (
    <>
      <Box paddingVertical="s32">
        <Text preset="headerCaptionMedium" semiBold mb="s16">
          Suas características
        </Text>

        <CharacteristicCard
          label="Gênero"
          mascInfo={details.gender.masc}
          femInfo={details.gender.fem}
        />
        <CharacteristicCard label="Saúde" count={details.health} />
        <CharacteristicCard label="Ataque" count={details.attack} />
        <CharacteristicCard label="Defesa" count={details.defense} />
        <CharacteristicCard label="Vl. Ataque" count={details.atkSpeed} />
        <CharacteristicCard label="Vl. Defesa" count={details.defSpeed} />
        <CharacteristicCard label="Velocidade" count={details.speed} />
        <CharacteristicCard label="Total" count={details.total} />
      </Box>
    </>
  );
}
