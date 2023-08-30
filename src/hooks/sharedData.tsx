import React, { ReactNode, createContext, useContext } from 'react';

interface AuthContextData {}

interface AppProviderProps {
  children: ReactNode;
}

const DataContext = createContext<AuthContextData>({} as AuthContextData);

function DataProvider({ children }: AppProviderProps) {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

function useSharedData(): AuthContextData {
  const context = useContext(DataContext);

  return context;
}

function AppProvider({ children }: AppProviderProps) {
  return <DataProvider>{children}</DataProvider>;
}

export { AppProvider, useSharedData };
