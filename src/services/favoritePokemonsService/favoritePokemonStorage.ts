import { Pokemon, PokemonDetails } from '@domain';

import { storage } from '../storage';

const FAVORITE_POKEMON_BASIC_KEY = '@Favorite_pokemon_basic';
const FAVORITE_POKEMON_DETAILS_KEY = '@Favorite_pokemon_details';

async function setPokemonBasic(pokemon: Pokemon): Promise<void> {
  await storage.setItem(FAVORITE_POKEMON_BASIC_KEY, pokemon);
}
async function getPokemonBasic(): Promise<Pokemon | null> {
  const item = await storage.getItem<Pokemon>(FAVORITE_POKEMON_BASIC_KEY);
  return item;
}
async function removePokemonBasic(): Promise<void> {
  await storage.removeItem(FAVORITE_POKEMON_BASIC_KEY);
}

async function setPokemonDetails(pokemon: PokemonDetails): Promise<void> {
  await storage.setItem(FAVORITE_POKEMON_DETAILS_KEY, pokemon);
}
async function getPokemonDetails(): Promise<PokemonDetails | null> {
  const item = await storage.getItem<PokemonDetails>(
    FAVORITE_POKEMON_DETAILS_KEY,
  );
  return item;
}
async function removePokemonDetails(): Promise<void> {
  await storage.removeItem(FAVORITE_POKEMON_DETAILS_KEY);
}

export const favoritePokemonStorage = {
  setPokemonBasic,
  getPokemonBasic,
  removePokemonBasic,
  setPokemonDetails,
  getPokemonDetails,
  removePokemonDetails,
};
