import React from 'react';

import { AppProvider, initializeStorage, MMKVStorage } from '@services';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Routes } from '@routes';

import theme from './src/theme/theme';

const queryClient = new QueryClient();

initializeStorage(MMKVStorage);

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </AppProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
