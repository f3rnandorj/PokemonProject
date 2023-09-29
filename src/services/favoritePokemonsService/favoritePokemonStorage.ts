import { storage } from '../storage';

import { FavoritePokemon } from './favoritePokemonsTypes';

const FAVORITE_POKEMON_BASIC_KEY = '@Favorite_pokemon';

async function getAllFavoritePokemons<T>(): Promise<T[]> {
  return await storage.getAllItens();
}

async function setPokemon(pokemon: FavoritePokemon): Promise<void> {
  await storage.setItem(`${FAVORITE_POKEMON_BASIC_KEY}_${pokemon.id}`, pokemon);
}
async function getPokemonById(
  pokemonId: FavoritePokemon['id'],
): Promise<FavoritePokemon | null> {
  const item = await storage.getItem<FavoritePokemon>(
    `${FAVORITE_POKEMON_BASIC_KEY}_${pokemonId}`,
  );
  return item;
}
async function removePokemon(pokemonId: FavoritePokemon['id']): Promise<void> {
  await storage.removeItem(`${FAVORITE_POKEMON_BASIC_KEY}_${pokemonId}`);
}

export const favoritePokemonStorage = {
  getAllFavoritePokemons,
  getPokemonById,
  setPokemon,
  removePokemon,
};
