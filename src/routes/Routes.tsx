import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppStack } from './AppStack';

export function Routes() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
