import { Page, apiAdapter } from '@api';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { AllPokemonDetails, Pokemon } from './pokemonTypes';

async function getListOfAllPokemonNames(): Promise<Pokemon['name'][]> {
  const listPokemonNames = await pokemonApi.getPokemonNamesList({
    page: 0,
    per_page: 1200,
  });

  return listPokemonNames.results.map(pokemonName => pokemonName.name);
}

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
  pokemonName: Pokemon['name'],
): Promise<AllPokemonDetails> {
  const pokemonBasicDetails = await pokemonApi.getBasicPokemonDetails(
    pokemonName,
  );
  const pokemonMoreDetails = await pokemonApi.getPokemonDetails(pokemonName);
  const pokemonEvolutions = await pokemonApi.getEvolutionsOfPokemon(
    pokemonMoreDetails.evolution_chain.url,
  );

  return {
    pokemonBasicDetails: pokemonAdapter.toPokemon(pokemonBasicDetails),
    pokemonInfoDetails: pokemonAdapter.toPokemonDetails(pokemonMoreDetails),
    pokemonEvolutionDetails: pokemonAdapter.toPokemonEvolutions(
      pokemonEvolutions,
      pokemonName,
    ),
  };
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemons,
  getListOfAllPokemonNames,
};
