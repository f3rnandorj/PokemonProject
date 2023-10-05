import { QueryKeys } from '@infra';
import { useQuery } from '@tanstack/react-query';

import { pokemonService } from '../pokemonService';

export function usePokemonNamesData() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.PokemonNamesList],
    queryFn: () => pokemonService.getListOfAllPokemonNames(),
    staleTime: 1000 * 60 * 60 * 24 * 30,
    cacheTime: Infinity,
  });

  return {
    pokemonNamesList: data,
    isError,
    isLoading,
    refetch,
  };
}
