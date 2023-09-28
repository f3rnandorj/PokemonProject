import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Page } from '@types';

export interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
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
    isLoading: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}

/** Last implementation */

// const [list, setList] = useState<TData[]>([]);
//   const [isError, setIsError] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState<number>(0);
//   const [hasNextPage, setHasNextPage] = useState(true);

//   const netInfo = useNetInfo();

//   async function fetchInitialData() {
//     if (netInfo.isConnected === false) {
//       setIsError(true);
//     } else {
//       setIsError(null);
//     }

//     try {
//       setIsError(null);
//       setIsLoading(true);
//       const { data, meta } = await getList(page);

//       setList(data);

//       if (meta.next) {
//         setPage(1);
//       } else {
//         setHasNextPage(false);
//       }
//     } catch (e) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function fetchNextPage() {
//     if (netInfo.isConnected === false) {
//       setIsError(true);
//     } else {
//       setIsError(null);
//     }

//     if (isLoading || !hasNextPage) {
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const { data, meta } = await getList(page);

//       setList(prev => [...prev, ...data]);

//       if (meta.next) {
//         setPage(prev => prev + 1);
//       } else {
//         setHasNextPage(false);
//       }
//     } catch (e) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   useEffect(() => {
//     fetchInitialData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
