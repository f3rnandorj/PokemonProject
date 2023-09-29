import React, { createContext, PropsWithChildren } from 'react';

import { usePokemonNamesData } from '@domain';

import { PokemonNamesService } from '../pokemonNamesTypes';

export const PokemonNamesContext = createContext<PokemonNamesService>(
  {} as PokemonNamesService,
);

export function PokemonNamesProvider({ children }: PropsWithChildren) {
  const { pokemonNamesList, isError, isLoading } = usePokemonNamesData();

  return (
    <PokemonNamesContext.Provider
      value={{
        pokemonNamesList,
        isError,
        isLoading,
      }}>
      {children}
    </PokemonNamesContext.Provider>
  );
}
