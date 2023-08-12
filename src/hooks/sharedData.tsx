import React, { ReactNode, createContext, useContext } from 'react';

import { Pokemon, usePokemonData } from '@domain';

interface AuthContextData {
  pokemonData: Pokemon[];
  errorToFetchPokemonData: boolean | null;
  loadingPokemonData: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const DataContext = createContext<AuthContextData>({} as AuthContextData);

function DataProvider({ children }: AppProviderProps) {
  const { pokemonData, errorToFetchPokemonData, loadingPokemonData } =
    usePokemonData();

  // const pokemonData: PokemonDataApi[] = [];
  // if (pokemonDetails.length === pokemonSpecies.length) {
  //   for (
  //     let pokemonIndex = 0;
  //     pokemonIndex < pokemonDetails.length;
  //     pokemonIndex++
  //   ) {
  //     const mergedObject: PokemonDetailsApi & PokemonSpeciesDetailsApi = {
  //       ...pokemonDetails[pokemonIndex],
  //       ...pokemonSpecies[pokemonIndex],
  //     };

  //     pokemonData.push(mergedObject);
  //   }
  // }

  return (
    <DataContext.Provider
      value={{ pokemonData, errorToFetchPokemonData, loadingPokemonData }}>
      {children}
    </DataContext.Provider>
  );
}

function useSharedData(): AuthContextData {
  const context = useContext(DataContext);

  return context;
}

function AppProvider({ children }: AppProviderProps) {
  return <DataProvider>{children}</DataProvider>;
}

export { AppProvider, useSharedData };
