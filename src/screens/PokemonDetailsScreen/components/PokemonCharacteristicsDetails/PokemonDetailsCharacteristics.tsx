import React from 'react';

import {
  Box,
  Text,
  CharacteristicCard,
  CharacteristicCardProps,
} from '@components';
import { Pokemon, PokemonDetails } from '@domain';

import {
  CharacteristicGenderCard,
  CharacteristicGenderCardProps,
} from './components/CharacteristicGenderCard';

type Props = Pick<
  Pokemon['characteristics'],
  | 'specialAtk'
  | 'attack'
  | 'specialDef'
  | 'defense'
  | 'health'
  | 'speed'
  | 'total'
> &
  Pick<PokemonDetails['characteristicsGender'], 'gender'>;

type CharacteristicCardInfoProps = Omit<CharacteristicCardProps, 'index'>;

export function PokemonDetailsCharacteristics(details: Props) {
  const characteristicCardInfo: CharacteristicCardInfoProps[] = [
    { label: 'Saúde', count: details.health },
    { label: 'Ataque', count: details.attack },
    { label: 'Defesa', count: details.defense },
    { label: 'Spc. Ataque', count: details.specialAtk },
    { label: 'Spc. Defesa', count: details.specialDef },
    { label: 'Velocidade', count: details.speed },
    { label: 'Total', count: details.total },
  ];

  const characteristicGenderCardInfo: CharacteristicGenderCardProps = {
    label: 'Gênero',
    mascInfo: details?.gender?.masc,
    femInfo: details?.gender?.fem,
  };

  return (
    <>
      <Box paddingVertical="s32">
        <Text preset="headerCaptionMedium" semiBold mb="s16">
          Suas características
        </Text>

        <CharacteristicGenderCard {...characteristicGenderCardInfo} />

        {characteristicCardInfo.map((card, indexCard) => (
          <CharacteristicCard
            key={card.label}
            isTotalCardDetails={characteristicCardInfo.length - 1 === indexCard}
            {...card}
          />
        ))}
      </Box>
    </>
  );
}
