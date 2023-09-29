import { useContext } from 'react';

import { PokemonNamesService } from './pokemonNamesTypes';
import { PokemonNamesContext } from './Providers/pokemonNamesProvider';

export function usePokemonNamesService(): PokemonNamesService {
  const context = useContext(PokemonNamesContext);

  if (!context) {
    throw new Error('You must use a context provider on app');
  }

  return context;
}
