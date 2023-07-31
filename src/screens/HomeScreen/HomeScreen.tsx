import React from 'react';
import { StatusBar } from 'react-native';

import { Screen, Text } from '@components';

import { MainHeader } from './components/MainHeader/MainHeader';

export function HomeScreen() {
  return (
    <Screen>
      <StatusBar backgroundColor="transparent" translucent />
      <MainHeader />
      <Text preset="headerMedium" semiBold mt="s40">
        Qual pokémon você{'\n'}escolheria?
      </Text>
    </Screen>
  );
}
