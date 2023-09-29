import React, { useEffect } from 'react';

import { useFavoritePokemonsService } from '@services';
import Orientation from 'react-native-orientation-locker';

import { Screen, Header, FavoritePokemonCard } from '@components';

export function FavoritePokemonScreen() {
  const {
    favoritePokemons,
    removeFavoritePokemonBasic,
    removeFavoritePokemonDetails,
  } = useFavoritePokemonsService();

  function removeFavoritePokemon() {
    removeFavoritePokemonBasic(favoritePokemons?.id!);
    removeFavoritePokemonDetails(favoritePokemons?.id!);
  }

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Screen>
      <Header title="Favoritos ⭐" subTitle="Veja sua coleção" />

      <FavoritePokemonCard removeFavoritePokemon={removeFavoritePokemon} />
    </Screen>
  );
}
