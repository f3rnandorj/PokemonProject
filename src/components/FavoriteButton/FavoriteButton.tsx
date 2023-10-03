import React from 'react';
import { Image } from 'react-native';

import { Pokemon, PokemonDetails } from '@domain';
import {
  FavoritePokemon,
  useFavoritePokemonsService,
  useToastService,
} from '@services';

import star from '../../assets/tabBarImages/star.png';
import starOutline from '../../assets/tabBarImages/starOutline.png';
import { TouchableOpacityBox } from '../Box/Box';

interface Props {
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
  isFavorite: boolean | undefined;
}

export function FavoriteButton({
  pokemonDetailsData,
  pokemonBasicDetailsData,
  isFavorite,
}: Props) {
  const {
    removeFavoritePokemon: removePokemon,
    saveFavoritePokemon: savePokemon,
    getFavoritePokemonById,
  } = useFavoritePokemonsService();

  const { showToast } = useToastService();

  const pokemon: FavoritePokemon = {
    ...pokemonBasicDetailsData,
    ...pokemonDetailsData,
  };

  function saveFavoritePokemon() {
    savePokemon(pokemon);
    getFavoritePokemonById(pokemon.id);

    showToast({
      message: 'Adicionado aos favoritos com sucesso! ⭐',
    });
  }

  function removeFavoritePokemon() {
    removePokemon(pokemon.id);
    getFavoritePokemonById(pokemon.id);

    showToast({
      message: 'Removido dos favoritos com sucesso! 🗑',
    });
  }

  const onPress = isFavorite ? removeFavoritePokemon : saveFavoritePokemon;

  const icon = isFavorite ? star : starOutline;

  return (
    <TouchableOpacityBox onPress={onPress}>
      <Image source={icon} style={{ height: 35, width: 35 }} />
    </TouchableOpacityBox>
  );
}
