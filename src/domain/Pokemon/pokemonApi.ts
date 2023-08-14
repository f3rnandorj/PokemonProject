import { api, PageParams } from '@api';

import {
  ListPokemonDataApi,
  Pokemon,
  PokemonApi,
  PokemonDetailsApi,
  ReturnListPokemonDataApi,
} from './pokemonTypes';

async function getPokemonNamesList(
  params?: PageParams,
): Promise<ReturnListPokemonDataApi<ListPokemonDataApi>> {
  const { data } = await api.get<ReturnListPokemonDataApi<ListPokemonDataApi>>(
    `/pokemon?limit=${params?.per_page}&offset=${params?.page}`,
  );

  return data;
}

async function getPokemonList(
  pokemonNames: ListPokemonDataApi[],
): Promise<PokemonApi[]> {
  const pokemonDetails = await Promise.all(
    pokemonNames.map(async pokemon => {
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
