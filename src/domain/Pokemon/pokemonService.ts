import { pokemonApi } from './pokemonApi';
import { Pokemon } from './types';

async function getListOfPokemon(): Promise<Pokemon[]> {
  const pokemonList = await pokemonApi.getList();

  return pokemonList;
}

export const pokemonService = {
  getListOfPokemon,
};
