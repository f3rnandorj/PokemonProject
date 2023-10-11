import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { FavoritePokemon, useToastService } from '@services';
import { ThemeColors } from '@theme';
import { masks } from '@utils';

import greatball from '../../assets/brandPokeballs/greatball.png';
import masterball from '../../assets/brandPokeballs/masterball.png';
import pokeball from '../../assets/brandPokeballs/pokeball.png';
import ultraball from '../../assets/brandPokeballs/ultraball.png';
import { Box, BoxProps, TouchableOpacityBox } from '../Box/Box';
import { CharacteristicCard } from '../CharacteristicCard/CharacteristicCard';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { PokemonAvatar } from '../PokemonAvatar/PokemonAvatar';
import { Text } from '../Text/Text';

import { objectPokemonAdapter } from './adapterFavoritePokemon';
import { AnimatedPokeball } from './components/AnimatedPokeball';

interface FavoritePokemonCardProps extends FavoritePokemon {
  isFavorite: boolean | undefined;
  onPress: () => void;
}

export function FavoritePokemonCard(pokemon: FavoritePokemonCardProps) {
  const pokemonRarity = getPokemonRarityUsingCaptureRate(
    pokemon.captureRate ?? 0,
    pokemon?.characteristics?.total,
  );

  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();

  const pokemonColor = pokemon.types?.[0] as ThemeColors;
  const borderColor = pokemonColor
    ? (`${pokemonColor}Light` as ThemeColors)
    : 'background';

  const pokemonName =
    (pokemon.name ?? '').charAt(0).toUpperCase() +
    (pokemon.name ?? '').slice(1);

  const adaptedPokemonDetailsObject =
    objectPokemonAdapter.toPokemonDetails(pokemon);

  function handleOnPress() {
    isConnected
      ? pokemon.onPress()
      : showToast({
          message: 'Sem conexão com a internet!',
          type: 'error',
        });
  }

  return (
    <TouchableOpacityBox
      onPress={handleOnPress}
      backgroundColor={pokemonColor}
      borderColor={borderColor}
      {...$button}>
      <Image
        source={{
          uri: `${pokemon.avatarURL}`,
        }}
        style={$backgroundImage}
        resizeMode="contain"
      />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <PokemonAvatar
            name={masks.changeDotForHyphen(pokemon.name)}
            height={55}
            width={55}
          />

          <AnimatedPokeball pokemonRarity={pokemonRarity} />

          <Text
            numberOfLines={1}
            textAlign="left"
            pl="s6"
            color="background"
            preset="headerMedium"
            bold>
            {pokemonName}
          </Text>
        </Box>

        <FavoriteButton
          isFavorite={pokemon.isFavorite}
          {...adaptedPokemonDetailsObject}
        />
      </Box>

      <Box pt="s10">
        <CharacteristicCard
          label="Poder"
          isTotalCardDetails
          count={pokemon?.characteristics?.total}
          isFavoriteCard
        />
      </Box>
    </TouchableOpacityBox>
  );
}

function getPokemonRarityUsingCaptureRate(
  captureRate: number,
  totalPower: number,
) {
  switch (true) {
    case captureRate <= 5:
      return masterball;

    case captureRate <= 50 && totalPower >= 450:
      return ultraball;

    case captureRate <= 120:
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
