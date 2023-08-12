import { pokemonAdapter } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import { Pokemon, PokemonDetails } from './pokemonTypes';

async function getListOfPokemons(): Promise<Pokemon[]> {
  const pokemonNames = await pokemonApi.getPokemonNamesList();

  const pokemonList = await pokemonApi.getPokemonList(pokemonNames);

  return pokemonList.map(pokemon => pokemonAdapter.toPokemon(pokemon));
}

async function getDetailsOfPokemons(
  id: Pokemon['id'],
): Promise<PokemonDetails> {
  const pokemonDetails = await pokemonApi.getPokemonDetails(id);

  return pokemonAdapter.toPokemonDetails(pokemonDetails);
}

export const pokemonService = {
  getListOfPokemons,
  getDetailsOfPokemons,
};
