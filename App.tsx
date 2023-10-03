import React from 'react';

import { AppProvider, initializeStorage, MMKVStorage } from '@services';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastComponent } from '@components';
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
            <ToastComponent />
          </ThemeProvider>
        </AppProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
