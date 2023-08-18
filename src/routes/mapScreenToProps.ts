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
      focused: require('../assets/brandPokeballs/pokeballOpen1.png'),
      unFocused: require('../assets/brandPokeballs/pokeballHome.png'),
    },
  },
  FavoritePokemonScreen: {
    label: 'Favoritos',
    icon: {
      focused: require('../assets/brandPokeballs/star.png'),
      unFocused: require('../assets/brandPokeballs/starOutline.png'),
    },
  },
  SearchPokemonScreen: {
    label: 'Localize',
    icon: {
      focused: require('../assets/brandPokeballs/search.png'),
      unFocused: require('../assets/brandPokeballs/searchOutline.png'),
    },
  },
};
