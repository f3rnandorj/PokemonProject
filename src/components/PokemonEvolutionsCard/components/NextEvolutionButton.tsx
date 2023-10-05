import React from 'react';
import {
  FlatList,
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
  PokemonAvatar,
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
  usage: 'searchScreen' | 'detailsScreen';
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
        <PokemonAvatar
          width={0}
          height={0}
          name={item}
          style={props.$sizeImage}
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
            { right: props.usage === 'searchScreen' ? 5 : 24 },
          ]}>
          <PokemonAvatar
            key={props?.nextEvolutionName!}
            width={0}
            height={0}
            name={props?.nextEvolutionName!}
            style={props.$sizeImage}
          />
        </TouchableOpacityBox>
      )}
    </>
  );
}
