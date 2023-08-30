import { api, PageParams } from '@api';
import axios from 'axios';

import {
  ListPokemonDataApi,
  Pokemon,
  PokemonApi,
  PokemonDetailsApi,
  PokemonEvolutionsApi,
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

async function getBasicPokemonDetails(
  pokemonName: Pokemon['name'],
): Promise<PokemonApi> {
  const { data: pokemonDetails } = await api.get<PokemonApi>(
    `/pokemon/${pokemonName}`,
  );

  return pokemonDetails;
}

async function getPokemonDetails(
  id: Pokemon['id'] | Pokemon['name'],
): Promise<PokemonDetailsApi> {
  const { data: pokemonDetails } = await api.get<PokemonDetailsApi>(
    `/pokemon-species/${id}`,
  );

  return pokemonDetails;
}

async function getEvolutionsOfPokemon(
  url: string,
): Promise<PokemonEvolutionsApi> {
  const { data: pokemonEvolutions } = await axios.get<PokemonEvolutionsApi>(
    `${url}`,
  );

  return pokemonEvolutions;
}

export const pokemonApi = {
  getPokemonNamesList,
  getPokemonList,
  getBasicPokemonDetails,
  getPokemonDetails,
  getEvolutionsOfPokemon,
};
