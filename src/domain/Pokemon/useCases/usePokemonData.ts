import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonData() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [errorToFetchPokemonData, setErrorToFetchPokemonData] = useState<
    boolean | null
  >(null);
  const [loadingPokemonData, setLoadingPokemonData] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const netInfo = useNetInfo();

  async function fetchInitialData() {
    if (netInfo.isConnected === false) {
      setErrorToFetchPokemonData(true);
    } else {
      setErrorToFetchPokemonData(null);
    }

    try {
      setErrorToFetchPokemonData(null);
      setLoadingPokemonData(true);
      const { data, meta } = await pokemonService.getListOfPokemons(0);

      setPokemonData(data);

      if (meta.next) {
        setPage(1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setLoadingPokemonData(false);
    }
  }

  async function fetchNextPage() {
    if (netInfo.isConnected === false) {
      setErrorToFetchPokemonData(true);
    } else {
      setErrorToFetchPokemonData(null);
    }

    if (loadingPokemonData || !hasNextPage) {
      return;
    }

    try {
      setLoadingPokemonData(true);
      const { data, meta } = await pokemonService.getListOfPokemons(page);

      setPokemonData(prev => [...prev, ...data]);

      if (meta.next) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setLoadingPokemonData(false);
    }
  }
  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pokemonData,
    errorToFetchPokemonData,
    loadingPokemonData,
    fetchNextPage,
  };
}
