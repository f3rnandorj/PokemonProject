import { Page, apiAdapter } from '@api';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { AllPokemonDetails, Pokemon } from './pokemonTypes';

async function getListOfPokemons(page: number): Promise<Page<Pokemon>> {
  const listPokemonData = await pokemonApi.getPokemonNamesList({
    page: page * 50,
    per_page: 50,
  });

  const pokemonList = await pokemonApi.getPokemonList(listPokemonData.results);

  return {
    data: pokemonList.map(pokemon => pokemonAdapter.toPokemon(pokemon)),
    meta: apiAdapter.toMetaDataPage(listPokemonData),
  };
}

async function getDetailsOfPokemons(
  id: Pokemon['id'],
): Promise<AllPokemonDetails> {
  const pokemonDetails = await pokemonApi.getPokemonDetails(id);

  const pokemonEvolutions = await pokemonApi.getEvolutionsOfPokemon(
    pokemonDetails.evolution_chain.url,
  );

  const pokemonInfoDetails = pokemonAdapter.toPokemonDetails(pokemonDetails);

  const pokemonEvolutionDetails = pokemonAdapter.toPokemonEvolutions(
    pokemonEvolutions,
    pokemonDetails?.name,
  );

  return { pokemonInfoDetails, pokemonEvolutionDetails };
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemons,
};
