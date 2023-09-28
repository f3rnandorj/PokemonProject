import React, { ReactNode, createContext, useContext } from 'react';

import { usePokemonNamesData } from '@domain';

interface AuthContextData {
  pokemonNamesList: string[] | undefined;
  isError: boolean | null;
  isLoading: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const DataContext = createContext<AuthContextData>({} as AuthContextData);

function DataProvider({ children }: AppProviderProps) {
  const { pokemonNamesList, isError, isLoading } = usePokemonNamesData();

  return (
    <DataContext.Provider
      value={{
        pokemonNamesList,
        isError,
        isLoading,
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
