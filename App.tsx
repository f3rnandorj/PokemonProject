import React from 'react';

import { ThemeProvider } from '@shopify/restyle';

import { AppProvider } from '@hooks';
import { Routes } from '@routes';

import theme from './src/theme/theme';

function App(): JSX.Element {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
