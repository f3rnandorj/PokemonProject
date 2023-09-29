import { useContext } from 'react';

import { FavoritePokemonsService } from './favoritePokemonsTypes';
import { FavoritePokemonProviderContext } from './Providers/favoritePokemonProvider';

export function useFavoritePokemonsService(): FavoritePokemonsService {
  const context = useContext(FavoritePokemonProviderContext);

  if (!context) {
    throw new Error('You must use a context provider on app');
  }

  return context;
}
