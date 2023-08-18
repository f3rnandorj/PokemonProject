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

import { AppTabBar } from './AppTabBar';

export type AppTabBottomParamList = {
  HomeScreen: undefined;
  SearchPokemonScreen: undefined;
  FavoritePokemonScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomParamList>();

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
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
