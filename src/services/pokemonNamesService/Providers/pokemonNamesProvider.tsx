import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { pokemonUtils, usePokemonNamesData } from '@domain';

import { PokemonNamesService } from '../pokemonNamesTypes';

export const PokemonNamesContext = createContext<PokemonNamesService>(
  {} as PokemonNamesService,
);

export function PokemonNamesProvider({ children }: PropsWithChildren) {
  const {
    pokemonNamesList: list,
    isError,
    isLoading,
    refetch,
  } = usePokemonNamesData();
  const [pokemonNamesList, setPokemonNamesList] = useState<string[]>([]);

  function getClearPokemonNames() {
    if (list) {
      const pokemonNames = pokemonUtils?.removePokemonsWithoutDetails(list);
      setPokemonNamesList(pokemonNames);
    }
  }

  useEffect(() => {
    getClearPokemonNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <PokemonNamesContext.Provider
      value={{
        pokemonNamesList,
        isError,
        isLoading,
        refetch,
      }}>
      {children}
    </PokemonNamesContext.Provider>
  );
}
