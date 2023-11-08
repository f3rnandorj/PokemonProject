import { renderHook, waitFor } from 'test-utils';

import { Page, MetaDataPage } from '@types';

import { usePaginatedList } from '../usePaginatedList';

const page1 = ['item1', 'item2', 'item3'];
const page2 = ['item4', 'item5', 'item6'];

async function getList(page: number): Promise<Page<string>> {
  const data = page === 1 ? page1 : page2;

  const meta: MetaDataPage = {
    currentPage: page,
    count: 1000,
    next: '',
    previous: '',
  };

  return Promise.resolve({ data, meta });
}

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
}));

const mockedGetList = jest.fn(getList);

describe('usePaginatedList', () => {
  test('returns all pages together and stops fetching if there are no more pages to fetch', async () => {
    const { result } = renderHook(() =>
      usePaginatedList(['key'], mockedGetList),
    );

    await waitFor(() => expect(result.current.list).toStrictEqual(page1));

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.list).toStrictEqual([...page1, ...page2]),
    );

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.list).toStrictEqual([...page1, ...page2]),
    );
  });
});
