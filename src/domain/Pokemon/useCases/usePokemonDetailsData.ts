import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@infra';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonDetailsData(pokemonName: Pokemon['name']) {
  const { isConnected } = useNetInfo();

  const { data, isError, isLoading, isInitialLoading, error } = useQuery({
    enabled: pokemonName.length > 0,
    queryKey: [QueryKeys.PokemonDetails, pokemonName],
    queryFn: () => {
      return pokemonService.getDetailsOfPokemons(pokemonName);
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  return {
    error,
    isError: isError || (!isConnected && !data) || !isConnected,
    isLoading,
    isInitialLoading,
    pokemonBasicDetailsData: data?.pokemonBasicDetails,
    pokemonDetailsData: data?.pokemonInfoDetails,
    pokemonEvolutionsData: data?.pokemonEvolutionDetails,
  };
}
