import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { Page } from '@types';

export function usePaginatedList<TData>(
  getList: (page: number) => Promise<Page<TData>>,
) {
  const [list, setList] = useState<TData[]>([]);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const netInfo = useNetInfo();

  async function fetchInitialData() {
    if (netInfo.isConnected === false) {
      setIsError(true);
    } else {
      setIsError(null);
    }

    try {
      setIsError(null);
      setIsLoading(true);
      const { data, meta } = await pokemonService.getListOfPokemons(0);

      setList(data);

      if (meta.next) {
        setPage(1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchNextPage() {
    if (netInfo.isConnected === false) {
      setIsError(true);
    } else {
      setIsError(null);
    }

    if (loadingPokemonData || !hasNextPage) {
      return;
    }

    try {
      setIsLoading(true);
      const { data, meta } = await pokemonService.getListOfPokemons(page);

      setList(prev => [...prev, ...data]);

      if (meta.next) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    list,
    isError,
    isLoading,
    fetchNextPage,
  };
}
