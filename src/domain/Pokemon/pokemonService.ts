import { PokemonDetails } from '@domain';

import { pokemonApi } from './pokemonApi';
import { Pokemon } from './pokemonTypes';

async function getListOfPokemons(): Promise<Pokemon[]> {
  const { pokemonDataMock } = await pokemonApi.getList();

  return pokemonDataMock;
}

async function getDetailsOfPokemon(): Promise<PokemonDetails> {
  const { pokemonDetailsDataMock } = await pokemonApi.getList();

  return pokemonDetailsDataMock;
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemon,
};
