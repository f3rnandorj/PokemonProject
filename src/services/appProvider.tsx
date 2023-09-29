import React, { PropsWithChildren } from 'react';

import { FavoritePokemonProvider } from './favoritePokemonsService';
import { PokemonNamesProvider } from './pokemonNamesService/Providers/pokemonNamesProvider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <PokemonNamesProvider>
      <FavoritePokemonProvider>{children}</FavoritePokemonProvider>
    </PokemonNamesProvider>
  );
}
