import React, { ReactNode, createContext, useContext } from 'react';

import { usePokemonNamesData } from '@domain';

interface AuthContextData {
  pokemonNamesData: string[];
  errorToFetchPokemonData: boolean | null;
  loadingPokemonNameData: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const DataContext = createContext<AuthContextData>({} as AuthContextData);

function DataProvider({ children }: AppProviderProps) {
  const { pokemonNamesData, loadingPokemonNameData, errorToFetchPokemonData } =
    usePokemonNamesData();

  return (
    <DataContext.Provider
      value={{
        pokemonNamesData,
        loadingPokemonNameData,
        errorToFetchPokemonData,
      }}>
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
