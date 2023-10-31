import { apiAdapter } from '@api';
import { Page } from '@types';
import { masks } from '@utils';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { AllPokemonDetails, Pokemon } from './pokemonTypes';

export const POKEMONS_TESTED_ON_API = 900;
export const POKEMONS_PER_PAGE = 20;

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
    page: page * POKEMONS_PER_PAGE,
    per_page: POKEMONS_PER_PAGE,
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
  const pokemonAdapted = masks.changeDotForHyphen(pokemonName);

  const pokemonBasicDetails = await pokemonApi.getBasicPokemonDetails(
    pokemonAdapted,
  );
  const pokemonMoreDetails = await pokemonApi.getPokemonDetails(pokemonAdapted);
  const pokemonEvolutions = await pokemonApi.getEvolutionsOfPokemon(
    pokemonMoreDetails.evolution_chain.url,
  );

  return {
    pokemonBasicDetails: pokemonAdapter.toPokemon(pokemonBasicDetails),
    pokemonInfoDetails: pokemonAdapter.toPokemonDetails(pokemonMoreDetails),
    pokemonEvolutionDetails: pokemonAdapter.toPokemonEvolutions(
      pokemonEvolutions,
      pokemonAdapted,
    ),
  };
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemons,
  getListOfAllPokemonNames,
};
