import React from 'react';
import { Dimensions } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import {
  BoxProps,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components';
import { Pokemon } from '@domain';
import { useAppTheme } from '@hooks';
import { useToastService } from '@services';
import { ThemeColors } from '@theme';

import { MemoPokemonAvatar } from './components/PokemonAvatar';
import { MemoPokemonInfos } from './components/PokemonInfos';

interface Props extends TouchableOpacityBoxProps {
  pokemon: Pokemon;
  index: number;
  onPress: () => void;
}

function PokemonCard({
  pokemon,
  index,
  onPress,
  ...touchableOpacityBoxProps
}: Props) {
  const { colors, spacing } = useAppTheme();
  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();

  const screenWidth = Dimensions.get('screen').width;
  const numberOfCardsInRow = 2;
  const marginHorizontal = spacing.s26 * 2;
  const separatorMarginRight = index % 2 === 0 ? spacing.s12 : 0;
  const spaceBetweenCards = spacing.s12;

  const widthCard =
    (screenWidth - marginHorizontal - spaceBetweenCards) / numberOfCardsInRow;
  const heightCard = widthCard - widthCard / 4;

  const backgroundCardColor =
    colors[pokemon.types[0] as ThemeColors] || colors.normal;

  function handleOnPress() {
    isConnected
      ? onPress()
      : showToast({
          message: 'Sem conexão com a internet!',
          type: 'error',
        });
  }

  return (
    <TouchableOpacityBox
      {...$wrapper}
      width={widthCard}
      minHeight={heightCard}
      style={{
        marginRight: separatorMarginRight,
        backgroundColor: backgroundCardColor,
      }}
      onPress={handleOnPress}
      {...touchableOpacityBoxProps}>
      <MemoPokemonInfos name={pokemon.name} types={pokemon.types} />

      <MemoPokemonAvatar id={pokemon.id} avatarURL={pokemon.avatarURL} />
    </TouchableOpacityBox>
  );
}

const $wrapper: BoxProps = {
  height: 130,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 's16',
  mb: 's16',
  pt: 's20',
  pb: 's22',
  borderRadius: 's14',
};

export const MemoPokemonCard = React.memo(PokemonCard);
