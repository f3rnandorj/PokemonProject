import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { arrayUtils } from '@utils';

import { favoritePokemonStorage } from '../favoritePokemonStorage';
import {
  FavoritePokemon,
  FavoritePokemonsService,
} from '../favoritePokemonsTypes';

export const FavoritePokemonProviderContext =
  createContext<FavoritePokemonsService>({} as FavoritePokemonsService);

export function FavoritePokemonProvider({ children }: PropsWithChildren) {
  const [allFavoritePokemons, setAllFavoritePokemons] = useState<
    FavoritePokemon[] | null
  >(null);
  const [favoritePokemon, setFavoritePokemon] =
    useState<FavoritePokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllFavoritePokemons() {
    const allPokemons =
      await favoritePokemonStorage.getAllFavoritePokemons<FavoritePokemon>();

    const sortedPokemons = arrayUtils.sort(allPokemons, (a, b) => a.id - b.id);

    setAllFavoritePokemons(sortedPokemons);
  }

  async function getFavoritePokemonById(
    pokemonId: FavoritePokemon['id'] | undefined,
  ) {
    if (pokemonId === undefined) {
      return setFavoritePokemon(null);
    }

    try {
      const pokemon = await favoritePokemonStorage.getPokemonById(pokemonId);

      if (pokemon) {
        setFavoritePokemon(pokemon);
      } else {
        setFavoritePokemon(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveFavoritePokemon(pokemon: FavoritePokemon): Promise<void> {
    const newFavoritePokemon = {
      ...pokemon,
      isFavorite: true,
    };

    await favoritePokemonStorage.setPokemon(newFavoritePokemon);
    getAllFavoritePokemons();
  }

  async function removeFavoritePokemon(pokemonId: FavoritePokemon['id']) {
    await favoritePokemonStorage.removePokemon(pokemonId);

    setFavoritePokemon(null);
    getAllFavoritePokemons();
  }

  useEffect(() => {
    getAllFavoritePokemons();
  }, []);

  return (
    <FavoritePokemonProviderContext.Provider
      value={{
        allFavoritePokemons,
        favoritePokemon,
        getAllFavoritePokemons,
        getFavoritePokemonById,
        saveFavoritePokemon,
        removeFavoritePokemon,
        isLoading,
      }}>
      {children}
    </FavoritePokemonProviderContext.Provider>
  );
}
