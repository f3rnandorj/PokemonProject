import React from 'react';
import { Dimensions } from 'react-native';

import { Pokemon } from '@domain';

import { BoxProps, TouchableOpacityBox } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import { PokemonAvatar } from './components/PokemonAvatar';
import { PokemonInfos } from './components/PokemonInfos';

interface Props {
  pokemon: Pokemon;
  index: number;
}

export function PokemonCard({ pokemon, index }: Props) {
  const { colors, spacing } = useAppTheme();

  const screenWidth = Dimensions.get('screen').width;
  const numberOfCardsInRow = 2;
  const marginHorizontal = spacing.s26 * 2;
  const separatorMarginRight = index % 2 === 0 ? spacing.s12 : 0;
  const spaceBetweenCards = spacing.s12;

  const widthCard =
    (screenWidth - marginHorizontal - spaceBetweenCards) / numberOfCardsInRow;

  const backgroundCardColor =
    colors[pokemon.types[0] as ThemeColors] || colors.normal;

  return (
    <TouchableOpacityBox
      {...$wrapper}
      width={widthCard}
      style={{
        marginRight: separatorMarginRight,
        backgroundColor: backgroundCardColor,
      }}>
      <PokemonInfos name={pokemon.name} types={pokemon.types} />

      <PokemonAvatar id={pokemon.id} avatarURL={pokemon.avatarURL} />
    </TouchableOpacityBox>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  mb: 's16',
  paddingHorizontal: 's16',
  pt: 's20',
  pb: 's24',
  borderRadius: 's14',
};
