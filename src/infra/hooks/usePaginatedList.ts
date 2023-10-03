import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useInfiniteQuery } from '@tanstack/react-query';
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
    queryFn: ({ pageParam = 0 }) => getList(pageParam),
    getNextPageParam: ({ meta }) => (meta.next ? meta.currentPage + 1 : null),
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

  const isError = netInfo.isConnected === false || query.isError;

  return {
    list,
    isError: isError,
    isLoading: query.isLoading,
    isLoadingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
