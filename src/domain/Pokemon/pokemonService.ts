import { pokemonApi } from './pokemonApi';
import { Pokemon } from './types';

async function getListOfPokemon(): Promise<Pokemon[]> {
  const pokemonList = await pokemonApi.getListOfPokemon();

  return pokemonList;
}

export const pokemonService = {
  getListOfPokemon,
};
