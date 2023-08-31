import { api, PageParams } from '@api';
import axios from 'axios';

import {
  PokemonNameDataApi,
  Pokemon,
  PokemonApi,
  PokemonDetailsApi,
  PokemonEvolutionsApi,
  ListPokemonNameDataApi,
} from './pokemonTypes';

async function getPokemonNamesList(
  params?: PageParams,
): Promise<ListPokemonNameDataApi<PokemonNameDataApi>> {
  const { data } = await api.get<ListPokemonNameDataApi<PokemonNameDataApi>>(
    `/pokemon?limit=${params?.per_page}&offset=${params?.page}`,
  );

  return data;
}

async function getPokemonList(
  pokemonNames: PokemonNameDataApi[],
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
