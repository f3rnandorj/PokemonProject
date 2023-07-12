import React from 'react';

import { ThemeProvider } from '@shopify/restyle';

import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import theme from './src/theme/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
}

export default App;
