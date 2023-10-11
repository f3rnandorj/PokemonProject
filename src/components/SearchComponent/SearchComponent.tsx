import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { Pokemon } from '@domain';
import Animated, { RollInLeft } from 'react-native-reanimated';

import { useAppTheme } from '@hooks';

import masterBall from '../../assets/brandPokeballs/masterball.png';
import { Box } from '../Box/Box';

import { InputProps, TextInput } from './components/TextInput';

export interface SearchComponentProps extends InputProps {
  setPokemonName: (name: Pokemon['name']) => void;
  initialDropBoxValue: string[] | undefined;
}

const IMG_SIZE = 65;

export function SearchComponent({
  value,
  setPokemonName,
  initialDropBoxValue,
  ...sRTextInputProps
}: InputProps) {
  const { spacing } = useAppTheme();

  return (
    <Box mt="s10" alignItems="center" flexDirection="row">
      <TextInput
        value={value}
        initialDropBoxValue={initialDropBoxValue}
        setPokemonName={setPokemonName}
        {...sRTextInputProps}
      />

      <Animated.View
        style={[$imgCommonStyle, { position: 'absolute' }]}
        entering={RollInLeft.duration(1000)}>
        <Image
          source={masterBall}
          style={$imgCommonStyle}
          resizeMode="contain"
        />
      </Animated.View>

      <Image
        source={{
          uri: 'https://projectpokemon.org/images/normal-sprite/mewtwo.gif',
        }}
        style={[
          $imgCommonStyle,
          {
            marginRight: spacing.ns12,
            right: 0,
            position: 'absolute',
          },
        ]}
        resizeMode="cover"
      />
    </Box>
  );
}

const $imgCommonStyle: StyleProp<ImageStyle> = {
  height: IMG_SIZE,
  width: IMG_SIZE,
};
