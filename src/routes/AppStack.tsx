import React from 'react';

import { Pokemon } from '@domain';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, PokemonDetailsScreen } from '@screens';

export type AppStackParamList = {
  HomeScreen: undefined;
  PokemonDetailsScreen: { pokemonName: Pokemon['name'] };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
      />
    </Stack.Navigator>
  );
}
