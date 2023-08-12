import { api } from '@api';

import {
  ListPokemonApi,
  Pokemon,
  PokemonApi,
  PokemonDetailsApi,
} from './pokemonTypes';

async function getPokemonNamesList(): Promise<ListPokemonApi> {
  const { data: pokemonNames } = await api.get<ListPokemonApi>('/pokemon');

  return pokemonNames;
}

async function getPokemonList(
  pokemonNames: ListPokemonApi,
): Promise<PokemonApi[]> {
  const pokemonDetails = await Promise.all(
    pokemonNames.results.map(async pokemon => {
      const response = await api.get<PokemonApi>(`/pokemon/${pokemon.name}`);

      return response.data;
    }),
  );

  return pokemonDetails;
}

async function getPokemonDetails(
  id: Pokemon['id'],
): Promise<PokemonDetailsApi> {
  const { data: pokemonDetails } = await api.get<PokemonDetailsApi>(
    `/pokemon-species/${id}`,
  );

  return pokemonDetails;
}

export const pokemonApi = {
  getPokemonNamesList,
  getPokemonList,
  getPokemonDetails,
};
