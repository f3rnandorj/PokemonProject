import React from 'react';
import { Image } from 'react-native';

import { Pokemon, PokemonDetails } from '@domain';
import { FavoritePokemon, useFavoritePokemonsService } from '@services';

import star from '../../assets/tabBarImages/star.png';
import starOutline from '../../assets/tabBarImages/starOutline.png';
import { TouchableOpacityBox } from '../Box/Box';

interface Props {
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
  isFavorite: boolean | undefined;
}

export function FavoriteButton({
  pokemonDetailsData,
  pokemonBasicDetailsData,
  isFavorite,
}: Props) {
  // const [isFavorite, setIsFavorite] = useState(false);

  const {
    removeFavoritePokemon: remove,
    saveFavoritePokemon: save,
    // favoritePokemon,
    getFavoritePokemonById,
  } = useFavoritePokemonsService();

  const pokemon: FavoritePokemon = {
    ...pokemonBasicDetailsData,
    ...pokemonDetailsData,
  };

  function saveFavoritePokemon() {
    save(pokemon);
    // setIsFavorite(true);
    getFavoritePokemonById(pokemon.id);
  }

  function removeFavoritePokemon() {
    remove(pokemon.id);
    // setIsFavorite(false);
    getFavoritePokemonById(pokemon.id);
  }

  const onPress = isFavorite ? removeFavoritePokemon : saveFavoritePokemon;

  const icon = isFavorite ? star : starOutline;

  // useEffect(() => {
  //   setIsFavorite(false);

  //   if (favoritePokemon) {
  //     setIsFavorite(true);
  //   } else {
  //     setIsFavorite(false);
  //   }
  // }, [favoritePokemon]);

  return (
    <TouchableOpacityBox onPress={onPress}>
      <Image source={icon} style={{ height: 35, width: 35 }} />
    </TouchableOpacityBox>
  );
}
