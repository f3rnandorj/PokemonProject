import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toast } from '@components';
import { Routes } from '@routes';
import { AppProvider, initializeStorage, MMKVStorage } from '@services';

import { theme } from './src/theme/theme';
import './src/translate/i18nConfig';

const queryClient = new QueryClient();

initializeStorage(MMKVStorage);

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Routes />
          <Toast />
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
