import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { ThemeColors } from '@theme';

import greatball from '../../assets/brandPokeballs/greatball.png';
import masterball from '../../assets/brandPokeballs/masterball.png';
import pokeball from '../../assets/brandPokeballs/pokeball.png';
import ultraball from '../../assets/brandPokeballs/ultraball.png';
import { usePokemonDetailsData } from '../../domain/Pokemon/useCases/usePokemonDetailsData';
import { Box, BoxProps, TouchableOpacityBox } from '../Box/Box';
import { CharacteristicCard } from '../CharacteristicCard/CharacteristicCard';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Text } from '../Text/Text';

import { AnimatedItem } from './components/AnimatedItem';

export function FavoritePokemonCard() {
  const { pokemonBasicDetailsData, pokemonDetailsData } =
    usePokemonDetailsData('charmander');

  const pokemonRarity = getPokemonRarityUsingCaptureRate(
    pokemonDetailsData?.captureRate ?? 0,
  );

  const pokemonColor = pokemonBasicDetailsData?.types?.[0] as ThemeColors;
  const borderColor = pokemonColor
    ? (`${pokemonColor}Light` as ThemeColors)
    : 'background';

  const pokemon =
    (pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
    (pokemonBasicDetailsData?.name ?? '').slice(1);

  return (
    <TouchableOpacityBox
      backgroundColor={pokemonColor}
      borderColor={borderColor}
      {...$button}>
      <Image
        source={{
          uri: `${pokemonBasicDetailsData?.avatarURL}`,
        }}
        style={$backgroundImage}
        resizeMode="contain"
      />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Image
            source={{
              uri: 'https://projectpokemon.org/images/normal-sprite/charmander.gif',
            }}
            style={{ height: 55, width: 55 }}
            resizeMode="contain"
          />
          <AnimatedItem pokemonRarity={pokemonRarity} />
          <Text textAlign="left" color="background" preset="headerMedium" bold>
            {pokemon}
          </Text>
        </Box>

        <FavoriteButton />
      </Box>

      <Box pt="s10">
        <CharacteristicCard
          label="Poder"
          index={0}
          isTotalCardDetails
          count={pokemonBasicDetailsData?.characteristics.total}
          isFavoriteCard
        />
      </Box>
    </TouchableOpacityBox>
  );
}

function getPokemonRarityUsingCaptureRate(captureRate: number) {
  switch (true) {
    case captureRate <= 5:
      return masterball;

    case captureRate <= 20:
      return ultraball;

    case captureRate <= 50:
      return greatball;

    default:
      return pokeball;
  }
}

const $button: BoxProps = {
  paddingVertical: 's10',
  paddingHorizontal: 's12',
  marginHorizontal: 's10',
  mt: 's8',
  borderRadius: 's24',
  borderWidth: 4,
  overflow: 'hidden',
};

const $backgroundImage: StyleProp<ImageStyle> = {
  flexWrap: 'nowrap',
  height: 200,
  width: 200,
  position: 'absolute',
  opacity: 0.5,
  alignSelf: 'center',
};
