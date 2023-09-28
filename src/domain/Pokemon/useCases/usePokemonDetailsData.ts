import { QueryKeys } from '@infra';
import { useQuery } from '@tanstack/react-query';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonDetailsData(pokemonName: Pokemon['name']) {
  const { data, isError, isLoading, isInitialLoading } = useQuery({
    enabled: pokemonName.length > 0,
    queryKey: [QueryKeys.PokemonDetails, pokemonName],
    queryFn: () => {
      return pokemonService.getDetailsOfPokemons(pokemonName);
    },
    staleTime: 1000 * 60,
  });
  console.log(isLoading, isInitialLoading);
  return {
    isError,
    isLoading,
    isInitialLoading,
    pokemonBasicDetailsData: data?.pokemonBasicDetails,
    pokemonDetailsData: data?.pokemonInfoDetails,
    pokemonEvolutionsData: data?.pokemonEvolutionDetails,
  };
}
