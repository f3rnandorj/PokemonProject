import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { Pokemon, PokemonDetails } from '@domain';
import { useFavoritePokemonsService } from '@services';

import star from '../../assets/tabBarImages/star.png';
import starOutline from '../../assets/tabBarImages/starOutline.png';
import { TouchableOpacityBox } from '../Box/Box';

type Props = {
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
};

export function FavoriteButton({
  pokemonDetailsData,
  pokemonBasicDetailsData,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    favoritePokemonDetails,
    favoritePokemons,
    saveFavoritePokemonBasic,
    saveFavoritePokemonDetails,
    removeFavoritePokemonBasic,
    removeFavoritePokemonDetails,
  } = useFavoritePokemonsService();

  function saveFavoritePokemon() {
    saveFavoritePokemonBasic(pokemonBasicDetailsData!);
    saveFavoritePokemonDetails(
      pokemonDetailsData!,
      pokemonBasicDetailsData?.id!,
    );
    setIsFavorite(true);
  }

  function removeFavoritePokemon() {
    removeFavoritePokemonBasic(pokemonBasicDetailsData?.id!);
    removeFavoritePokemonDetails(pokemonBasicDetailsData?.id!);
    setIsFavorite(false);
  }

  const onPress = isFavorite ? removeFavoritePokemon : saveFavoritePokemon;

  const icon = isFavorite ? star : starOutline;

  useEffect(() => {
    if (favoritePokemonDetails && favoritePokemons) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [
    pokemonDetailsData,
    pokemonBasicDetailsData,
    favoritePokemons,
    favoritePokemonDetails,
  ]);

  return (
    <TouchableOpacityBox onPress={onPress}>
      <Image source={icon} style={{ height: 35, width: 35 }} />
    </TouchableOpacityBox>
  );
}
