import { apiAdapter } from '@api';
import { Page } from '@types';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { AllPokemonDetails, Pokemon } from './pokemonTypes';

const POKEMONS_TESTED_ON_API = 1000;

async function getListOfAllPokemonNames(): Promise<Pokemon['name'][]> {
  const listPokemonNames = await pokemonApi.getPokemonNamesList({
    page: 0,
    per_page: POKEMONS_TESTED_ON_API,
  });

  const listNames = listPokemonNames.results.map(
    pokemonName => pokemonName.name,
  );

  return pokemonAdapter.toClearPokemonNames(listNames);
}

async function getListOfPokemons(page: number): Promise<Page<Pokemon>> {
  const listPokemonNames = await pokemonApi.getPokemonNamesList({
    page: page * 20,
    per_page: 20,
  });

  const listNames = listPokemonNames.results.map(
    pokemonName => pokemonName.name,
  );

  const adaptedClearListNames = pokemonAdapter.toClearPokemonNames(listNames);

  const pokemonList = await pokemonApi.getPokemonList(adaptedClearListNames);

  return {
    data: pokemonList.map(pokemon => pokemonAdapter.toPokemon(pokemon)),
    meta: apiAdapter.toMetaDataPage(listPokemonNames, page),
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
