import React from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import {
  TouchableOpacityBox,
  PokemonEvolutionProps,
  BoxProps,
} from '@components';
import { ThemeColors } from '@theme';

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
        <Image
          source={{
            uri: `https://projectpokemon.org/images/normal-sprite/${props.lastEvolutionName}.gif`,
          }}
          style={props.$sizeImage}
          resizeMode="contain"
        />
      </TouchableOpacityBox>
    </>
  );
}
