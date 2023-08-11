import { pokemonAdapter, PokemonDataApi } from './pokemonAdapter';
import { pokemonApi } from './pokemonApi';
import {
  Pokemon,
  PokemonDetailsApi,
  PokemonSpeciesDetailsApi,
} from './pokemonTypes';

async function getListOfPokemons(): Promise<Pokemon[]> {
  const pokemonNames = await pokemonApi.getPokemonNamesList();

  const pokemonDetailsPromises = pokemonApi.getPokemonDetailsList(pokemonNames);
  const pokemonSpeciesPromises =
    pokemonApi.getPokemonSpeciesDetailsList(pokemonNames);

  const [pokemonDetails, pokemonSpecies] = await Promise.all([
    pokemonDetailsPromises,
    pokemonSpeciesPromises,
  ]);

  const pokemonData: PokemonDataApi[] = [];
  if (pokemonDetails.length === pokemonSpecies.length) {
    for (
      let pokemonIndex = 0;
      pokemonIndex < pokemonDetails.length;
      pokemonIndex++
    ) {
      const mergedObject: PokemonDetailsApi & PokemonSpeciesDetailsApi = {
        ...pokemonDetails[pokemonIndex],
        ...pokemonSpecies[pokemonIndex],
      };

      pokemonData.push(mergedObject);
    }
  }

  return pokemonData.map(pokemon => pokemonAdapter.toPokemon(pokemon));
}

export const pokemonService = {
  getListOfPokemons,
};
