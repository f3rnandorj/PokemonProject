import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from './AppStack';

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;
