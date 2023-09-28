import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProvider } from '@hooks';
import { Routes } from '@routes';

import theme from './src/theme/theme';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
