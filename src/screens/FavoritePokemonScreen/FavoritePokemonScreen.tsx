import React, { useEffect } from 'react';

import Orientation from 'react-native-orientation-locker';

import { Screen, Header, FavoritePokemonCard } from '@components';

export function FavoritePokemonScreen() {
  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Screen>
      <Header title="Favoritos ⭐" subTitle="Veja sua coleção" />

      <FavoritePokemonCard />
    </Screen>
  );
}
