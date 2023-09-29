import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { Pokemon, PokemonDetails } from '@domain';

import { favoritePokemonStorage } from '../favoritePokemonStorage';
import { FavoritePokemonsService } from '../favoritePokemonsTypes';

export const FavoritePokemonProviderContext =
  createContext<FavoritePokemonsService>({} as FavoritePokemonsService);

export function FavoritePokemonProvider({ children }: PropsWithChildren) {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon | null>(
    null,
  );
  const [favoritePokemonDetails, setFavoritePokemonDetails] =
    useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getFavoritePokemons() {
    try {
      const pokemonsBasic = await favoritePokemonStorage.getPokemonBasic();
      const pokemonsDetails = await favoritePokemonStorage.getPokemonDetails();

      if (favoritePokemons && pokemonsDetails) {
        setFavoritePokemons(pokemonsBasic);
        setFavoritePokemonDetails(pokemonsDetails);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveFavoritePokemonBasic(pokemon: Pokemon): Promise<void> {
    await favoritePokemonStorage.setPokemonBasic(pokemon);
  }

  async function removeFavoritePokemonBasic() {
    await favoritePokemonStorage.removePokemonBasic();
    setFavoritePokemons(null);
  }

  async function saveFavoritePokemonDetails(
    pokemon: PokemonDetails,
  ): Promise<void> {
    await favoritePokemonStorage.setPokemonDetails(pokemon);
  }

  async function removeFavoritePokemonDetails() {
    await favoritePokemonStorage.removePokemonDetails();
    setFavoritePokemonDetails(null);
  }

  useEffect(() => {
    getFavoritePokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FavoritePokemonProviderContext.Provider
      value={{
        favoritePokemons,
        favoritePokemonDetails,
        isLoading,
        saveFavoritePokemonBasic,
        removeFavoritePokemonBasic,
        saveFavoritePokemonDetails,
        removeFavoritePokemonDetails,
      }}>
      {children}
    </FavoritePokemonProviderContext.Provider>
  );
}
