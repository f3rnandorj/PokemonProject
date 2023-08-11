import React from 'react';

import { Pokemon } from '@domain';

import { Box, Text } from '@components';

import {
  CharacteristicCard,
  CharacteristicCardProps,
} from './components/CharacteristicCard';

type Props = Pick<
  Pokemon['characteristics'],
  | 'gender'
  | 'specialAtk'
  | 'attack'
  | 'specialDef'
  | 'defense'
  | 'health'
  | 'speed'
  | 'total'
>;

type CharacteristicCardInfoProps = Omit<CharacteristicCardProps, 'index'>;

export function PokemonCharacteristicsDetails(details: Props) {
  const characteristicCardInfo: CharacteristicCardInfoProps[] = [
    {
      label: 'Gênero',
      mascInfo: details.gender.masc,
      femInfo: details.gender.fem,
    },
    { label: 'Saúde', count: details.health },
    { label: 'Ataque', count: details.attack },
    { label: 'Defesa', count: details.defense },
    { label: 'Spc. Ataque', count: details.specialAtk },
    { label: 'Spc. Defesa', count: details.specialDef },
    { label: 'Velocidade', count: details.speed },
    { label: 'Total', count: details.total },
  ];

  return (
    <>
      <Box paddingVertical="s32">
        <Text preset="headerCaptionMedium" semiBold mb="s16">
          Suas características
        </Text>

        {characteristicCardInfo.map((card, indexCard) => (
          <CharacteristicCard key={card.label} index={indexCard} {...card} />
        ))}
      </Box>
    </>
  );
}
