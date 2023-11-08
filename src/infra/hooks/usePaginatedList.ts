import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useInfiniteQuery } from '@tanstack/react-query';

import { POKEMONS_PER_PAGE, POKEMONS_TESTED_ON_API } from '@domain';
import { Page } from '@types';

export interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  fetchNextPage: () => void;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
): UsePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const netInfo = useNetInfo();

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList(pageParam),
    getNextPageParam: ({ meta }) =>
      meta.currentPage < POKEMONS_TESTED_ON_API / POKEMONS_PER_PAGE
        ? meta.currentPage + 1
        : undefined,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);

      setList(newList);
    }
  }, [query.data]);

  const isError = netInfo?.isConnected === false || query.isError;
  const listValue = netInfo?.isConnected === false ? [] : list;

  return {
    list: listValue,
    isError,
    isLoading: query.isLoading,
    isLoadingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
