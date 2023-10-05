import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

import {
  TouchableOpacityBox,
  PokemonEvolutionProps,
  BoxProps,
} from '@components';
import { ThemeColors } from '@theme';

import { PokemonAvatar } from '../../PokemonAvatar/PokemonAvatar';

type Props = Pick<
  PokemonEvolutionProps,
  'fetchEvolutionPokemonDetails' | 'lastEvolutionName'
> & {
  $wrapperButton: BoxProps;
  $wrapperButtonMoreStyles: StyleProp<ViewStyle>;
  $sizeImage: StyleProp<ImageStyle>;
  $shadowProps: ViewStyle;
  colorOfPokemon: ThemeColors;
  usage: 'searchScreen' | 'detailsScreen';
};

export function LastEvolutionButton(props: Props) {
  return (
    <>
      <TouchableOpacityBox
        {...props.$wrapperButton}
        onPress={() =>
          props.fetchEvolutionPokemonDetails(props?.lastEvolutionName!)
        }
        borderColor={props.colorOfPokemon}
        style={[
          props.$wrapperButtonMoreStyles,
          props.$shadowProps,
          { left: props.usage === 'searchScreen' ? 5 : 24 },
        ]}>
        <PokemonAvatar
          key={props?.lastEvolutionName!}
          width={0}
          height={0}
          name={props.lastEvolutionName!}
          style={props.$sizeImage}
        />
      </TouchableOpacityBox>
    </>
  );
}
