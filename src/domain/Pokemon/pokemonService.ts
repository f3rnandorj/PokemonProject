import { Page, apiAdapter } from '@api';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { Pokemon, PokemonDetails } from './pokemonTypes';

async function getListOfPokemons(page: number): Promise<Page<Pokemon>> {
  const listPokemonData = await pokemonApi.getPokemonNamesList({
    page: page * 10,
    per_page: 10,
  });

  const pokemonList = await pokemonApi.getPokemonList(listPokemonData.results);

  return {
    data: pokemonList.map(pokemon => pokemonAdapter.toPokemon(pokemon)),
    meta: apiAdapter.toMetaDataPage(listPokemonData),
  };
}

async function getDetailsOfPokemons(
  id: Pokemon['id'],
): Promise<PokemonDetails> {
  const pokemonDetails = await pokemonApi.getPokemonDetails(id);

  return pokemonAdapter.toPokemonDetails(pokemonDetails);
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemons,
};
