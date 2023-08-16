import React from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  TouchableOpacityBox,
  PokemonEvolutionProps,
  BoxProps,
  Box,
} from '@components';
import { ThemeColors } from '@theme';

type Props = Pick<
  PokemonEvolutionProps,
  | 'fetchEvolutionPokemonDetails'
  | 'nextEvolutionName'
  | 'moreThanOneMidEvolutions'
> & {
  $wrapperButton: BoxProps;
  $wrapperButtonMoreStyles: StyleProp<ViewStyle>;
  $sizeImage: StyleProp<ImageStyle>;
  $shadowProps: ViewStyle;
  colorOfPokemon: ThemeColors;
};

const IMG_SIZE = 60;

export function NextEvolutionButton(props: Props) {
  function renderItem({ item, index }: ListRenderItemInfo<string>) {
    return (
      <TouchableOpacityBox
        justifyContent="center"
        alignItems="center"
        style={{ borderRadius: 50 }}
        onPress={() => {
          props.fetchEvolutionPokemonDetails(
            props?.moreThanOneMidEvolutions?.[index]!,
          );
        }}>
        <Image
          source={{
            uri: `https://projectpokemon.org/images/normal-sprite/${item}.gif`,
          }}
          style={props.$sizeImage}
          resizeMode="contain"
        />
      </TouchableOpacityBox>
    );
  }

  return (
    <>
      {props?.moreThanOneMidEvolutions ? (
        <Box
          {...props.$wrapperButton}
          borderColor={props.colorOfPokemon}
          style={[
            props.$wrapperButtonMoreStyles,
            props.$shadowProps,
            { right: 24 },
          ]}>
          <FlatList
            data={props?.moreThanOneMidEvolutions}
            keyExtractor={item => item}
            renderItem={renderItem}
            horizontal
            nestedScrollEnabled={true}
            snapToInterval={IMG_SIZE}
            decelerationRate="fast"
          />
        </Box>
      ) : (
        <TouchableOpacityBox
          {...props.$wrapperButton}
          onPress={() =>
            props.fetchEvolutionPokemonDetails(props?.nextEvolutionName!)
          }
          borderColor={props.colorOfPokemon}
          style={[
            props.$wrapperButtonMoreStyles,
            props.$shadowProps,
            { right: 24 },
          ]}>
          <Image
            source={{
              uri:
                props.nextEvolutionName === 'sirfetchd'
                  ? 'https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/sirfetchd.gif'
                  : `https://projectpokemon.org/images/normal-sprite/${props.nextEvolutionName}.gif`,
            }}
            style={props.$sizeImage}
            resizeMode="contain"
          />
        </TouchableOpacityBox>
      )}
    </>
  );
}
