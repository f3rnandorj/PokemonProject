import { apiAdapter } from '@api';
import { Page } from '@types';

import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { AllPokemonDetails, Pokemon } from './pokemonTypes';

const POKEMONS_TESTED_ON_API = 870;

async function getListOfAllPokemonNames(): Promise<Pokemon['name'][]> {
  const listPokemonNames = await pokemonApi.getPokemonNamesList({
    page: 0,
    per_page: POKEMONS_TESTED_ON_API,
  });

  return listPokemonNames.results.map(pokemonName => pokemonName.name);
}

async function getListOfPokemons(page: number): Promise<Page<Pokemon>> {
  const listPokemonData = await pokemonApi.getPokemonNamesList({
    page: page * 20,
    per_page: 20,
  });

  const pokemonList = await pokemonApi.getPokemonList(listPokemonData.results);

  return {
    data: pokemonList.map(pokemon => pokemonAdapter.toPokemon(pokemon)),
    meta: apiAdapter.toMetaDataPage(listPokemonData, page),
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
