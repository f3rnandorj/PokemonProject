import { QueryKeys, usePaginatedList } from '@infra';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonList() {
  return usePaginatedList<Pokemon>(
    [QueryKeys.PokemonDetailsList],
    pokemonService.getListOfPokemons,
  );
}
