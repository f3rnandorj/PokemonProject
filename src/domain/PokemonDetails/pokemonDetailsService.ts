import { pokemonDetailsApi } from './pokemonDetailsApi';
import { PokemonDetails } from './types';

async function getList(): Promise<PokemonDetails> {
  const pokemonDetails = await pokemonDetailsApi.getList();

  return pokemonDetails;
}

export const pokemonDetailsService = {
  getList,
};
