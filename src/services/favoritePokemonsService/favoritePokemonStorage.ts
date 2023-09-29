import { Pokemon, PokemonDetails } from '@domain';

import { storage } from '../storage';

const FAVORITE_POKEMON_BASIC_KEY = '@Favorite_pokemon_basic';
const FAVORITE_POKEMON_DETAILS_KEY = '@Favorite_pokemon_details';

async function getAllFavoritePokemons(): Promise<string[]> {
  return await storage.getAllItens();
}

async function setPokemonBasic(pokemon: Pokemon): Promise<void> {
  await storage.setItem(`${FAVORITE_POKEMON_BASIC_KEY}_${pokemon.id}`, pokemon);
}
async function getPokemonBasic(
  pokemonId: Pokemon['id'],
): Promise<Pokemon | null> {
  const item = await storage.getItem<Pokemon>(
    `${FAVORITE_POKEMON_BASIC_KEY}_${pokemonId}`,
  );
  return item;
}
async function removePokemonBasic(pokemonId: Pokemon['id']): Promise<void> {
  await storage.removeItem(`${FAVORITE_POKEMON_BASIC_KEY}_${pokemonId}`);
}

async function setPokemonDetails(
  pokemon: PokemonDetails,
  pokemonId: Pokemon['id'],
): Promise<void> {
  await storage.setItem(
    `${FAVORITE_POKEMON_DETAILS_KEY}_${pokemonId}`,
    pokemon,
  );
}
async function getPokemonDetails(
  pokemonId: Pokemon['id'],
): Promise<PokemonDetails | null> {
  const item = await storage.getItem<PokemonDetails>(
    `${FAVORITE_POKEMON_DETAILS_KEY}_${pokemonId}`,
  );
  return item;
}
async function removePokemonDetails(pokemonId: Pokemon['id']): Promise<void> {
  await storage.removeItem(`${FAVORITE_POKEMON_DETAILS_KEY}_${pokemonId}`);
}

export const favoritePokemonStorage = {
  getAllFavoritePokemons,
  setPokemonBasic,
  getPokemonBasic,
  removePokemonBasic,
  setPokemonDetails,
  getPokemonDetails,
  removePokemonDetails,
};
