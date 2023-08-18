import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from './AppStack';
import { AppTabBottomParamList } from './AppTabNavigator';

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;

export type AppTabScreenProps<RouteName extends keyof AppTabBottomParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabBottomParamList, RouteName>,
    NativeStackScreenProps<AppStackParamList, 'AppTabNavigator'>
  >;
