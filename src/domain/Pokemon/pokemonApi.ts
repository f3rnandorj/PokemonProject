import { api } from '@api';

import {
  ListPokemonApi,
  PokemonDetailsApi,
  PokemonSpeciesDetailsApi,
} from './pokemonTypes';

async function getPokemonNamesList(): Promise<ListPokemonApi> {
  const { data: pokemonNames } = await api.get<ListPokemonApi>('/pokemon');

  return pokemonNames;
}

async function getPokemonDetailsList(
  pokemonNames: ListPokemonApi,
): Promise<PokemonDetailsApi[]> {
  const pokemonDetails = await Promise.all(
    pokemonNames.results.map(async pokemon => {
      const response = await api.get<PokemonDetailsApi>(
        `/pokemon/${pokemon.name}`,
      );

      return response.data;
    }),
  );

  return pokemonDetails;
}

async function getPokemonSpeciesDetailsList(
  pokemonNames: ListPokemonApi,
): Promise<PokemonSpeciesDetailsApi[]> {
  const pokemonSpecies = await Promise.all(
    pokemonNames.results.map(async pokemon => {
      const response = await api.get<PokemonSpeciesDetailsApi>(
        `/pokemon-species/${pokemon.name}`,
      );

      return response.data;
    }),
  );

  return pokemonSpecies;
}

export const pokemonApi = {
  getPokemonNamesList,
  getPokemonDetailsList,
  getPokemonSpeciesDetailsList,
};
