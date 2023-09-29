import { ImageSourcePropType } from 'react-native';

import { AppTabBottomParamList } from './AppTabNavigator';

export const mapScreenToProps: Record<
  keyof AppTabBottomParamList,
  {
    label: string;
    icon: {
      focused: ImageSourcePropType;
      unFocused: ImageSourcePropType;
    };
  }
> = {
  HomeScreen: {
    label: 'Pokédex',
    icon: {
      focused: require('../assets/tabBarImages/pokeballOpen1.png'),
      unFocused: require('../assets/tabBarImages/pokeballHome.png'),
    },
  },
  FavoritePokemonScreen: {
    label: 'Favoritos',
    icon: {
      focused: require('../assets/tabBarImages/star.png'),
      unFocused: require('../assets/tabBarImages/starOutline.png'),
    },
  },
  SearchPokemonScreen: {
    label: 'Localize',
    icon: {
      focused: require('../assets/tabBarImages/search.png'),
      unFocused: require('../assets/tabBarImages/searchOutline.png'),
    },
  },
};
