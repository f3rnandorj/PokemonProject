import React from 'react';

import { ThemeProvider } from '@shopify/restyle';

import { Routes } from '@routes';

import theme from './src/theme/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
