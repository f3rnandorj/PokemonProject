import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  FavoritePokemonScreen,
  HomeScreen,
  SearchPokemonScreen,
} from '@screens';

import { BottomTabBar } from './BottomTabBar';

export type AppTabBottomParamList = {
  HomeScreen: undefined;
  SearchPokemonScreen: undefined;
  FavoritePokemonScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomParamList>();

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <BottomTabBar {...props} />;
  }

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="SearchPokemonScreen" component={SearchPokemonScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="FavoritePokemonScreen"
        component={FavoritePokemonScreen}
      />
    </Tab.Navigator>
  );
}
