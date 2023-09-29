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
  const [allFavoritePokemons, setAllFavoritePokemons] = useState<any>(null);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon | null>(
    null,
  );
  const [favoritePokemonDetails, setFavoritePokemonDetails] =
    useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllFavoritePokemons() {
    const allPokemons = await favoritePokemonStorage.getAllFavoritePokemons();
    setAllFavoritePokemons(allPokemons);
  }

  async function getFavoritePokemonById(pokemonId: Pokemon['id'] | undefined) {
    if (pokemonId === undefined) {
      return;
    }

    try {
      const pokemonsBasic = await favoritePokemonStorage.getPokemonBasic(
        pokemonId,
      );
      const pokemonsDetails = await favoritePokemonStorage.getPokemonDetails(
        pokemonId,
      );

      if (pokemonsBasic && pokemonsDetails) {
        setFavoritePokemons(pokemonsBasic);
        setFavoritePokemonDetails(pokemonsDetails);
      } else {
        setFavoritePokemons(null);
        setFavoritePokemonDetails(null);
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

  async function removeFavoritePokemonBasic(pokemonId: Pokemon['id']) {
    await favoritePokemonStorage.removePokemonBasic(pokemonId);
    setFavoritePokemons(null);
  }

  async function saveFavoritePokemonDetails(
    pokemon: PokemonDetails,
    pokemonId: Pokemon['id'],
  ): Promise<void> {
    await favoritePokemonStorage.setPokemonDetails(pokemon, pokemonId);
  }

  async function removeFavoritePokemonDetails(pokemonId: Pokemon['id']) {
    await favoritePokemonStorage.removePokemonDetails(pokemonId);
    setFavoritePokemonDetails(null);
  }

  useEffect(() => {
    getAllFavoritePokemons();
  }, []);

  return (
    <FavoritePokemonProviderContext.Provider
      value={{
        allFavoritePokemons,
        favoritePokemons,
        favoritePokemonDetails,
        isLoading,
        saveFavoritePokemonBasic,
        removeFavoritePokemonBasic,
        saveFavoritePokemonDetails,
        removeFavoritePokemonDetails,
        getAllFavoritePokemons,
        getFavoritePokemonById,
      }}>
      {children}
    </FavoritePokemonProviderContext.Provider>
  );
}
