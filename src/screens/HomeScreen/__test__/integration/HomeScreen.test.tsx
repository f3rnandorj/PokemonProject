import React from 'react';

import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { mockedPokemonListData, server } from '@test';
import { renderScreen, screen, waitFor } from 'test-utils';

import { usePokemonList } from '@domain';

import { HomeScreen } from '../../HomeScreen';

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  server.resetHandlers();
  server.close();
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

jest.mock('react-native-orientation-locker', () => {
  return {
    lockToPortrait: jest.fn(),
    unlockAllOrientations: jest.fn(),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
}));
const mockedUseNetInfo = jest.mocked(useNetInfo);

const actualDomain = jest.requireActual('@domain');
jest.mock('@domain', () => ({
  usePokemonList: jest.fn(),
}));
const mockedUsePokemonList = jest.mocked(usePokemonList);

describe('integration: HomeScreen', () => {
  test('renders homeEmpty when isError is true', () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: false } as NetInfoState);

    mockedUsePokemonList.mockReturnValue({
      list: [],
      isError: true,
      fetchNextPage: jest.fn(),
      isLoading: false,
      isLoadingNextPage: false,
    });

    renderScreen(
      <HomeScreen
        navigation={{} as any}
        route={{
          key: 'HomeScreen',
          name: 'HomeScreen',
        }}
      />,
    );

    const homeEmptyElement = screen.queryByTestId(/home-empty-is-error/i);

    expect(homeEmptyElement).toBeTruthy();
  });
  test('renders first loading when homeEmpty isLoading is true data', () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: true } as NetInfoState);

    mockedUsePokemonList.mockReturnValue({
      list: [],
      isError: false,
      fetchNextPage: jest.fn(),
      isLoading: true,
      isLoadingNextPage: false,
    });

    renderScreen(
      <HomeScreen
        navigation={{} as any}
        route={{
          key: 'HomeScreen',
          name: 'HomeScreen',
        }}
      />,
    );

    const homeEmptyElement = screen.queryByTestId(/home-empty-is-loading/i);

    expect(homeEmptyElement).toBeTruthy();
  });
  test('shows ImageBackGround component', async () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: true } as NetInfoState);

    mockedUsePokemonList.mockReturnValue({
      list: mockedPokemonListData.mockedDataPokemonList,
      isError: false,
      fetchNextPage: jest.fn(),
      isLoading: false,
      isLoadingNextPage: false,
    });

    renderScreen(
      <HomeScreen
        navigation={{} as any}
        route={{
          key: 'HomeScreen',
          name: 'HomeScreen',
        }}
      />,
    );

    await waitFor(async () => {
      const imageBackgroundElement = await screen.findByTestId(
        /image-background/i,
      );
      expect(imageBackgroundElement).toBeTruthy();
    });
  });
  test('shows LoadingDataScreen component', async () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: true } as NetInfoState);

    mockedUsePokemonList.mockReturnValue({
      list: mockedPokemonListData.mockedDataPokemonList,
      isError: false,
      fetchNextPage: jest.fn(),
      isLoading: false,
      isLoadingNextPage: true,
    });

    renderScreen(
      <HomeScreen
        navigation={{} as any}
        route={{
          key: 'HomeScreen',
          name: 'HomeScreen',
        }}
      />,
    );

    const loadingDataElement = await screen.findByTestId(/loading-data/i);
    expect(loadingDataElement).toBeTruthy();
  });
  test('render the list with numbers of pokemons returned from the Api', async () => {
    mockedUsePokemonList.mockImplementation(actualDomain.usePokemonList);
    server.listen();

    mockedUseNetInfo.mockReturnValue({ isConnected: true } as NetInfoState);

    renderScreen(
      <HomeScreen
        navigation={{} as any}
        route={{
          key: 'HomeScreen',
          name: 'HomeScreen',
        }}
      />,
    );

    const countCardsRendered =
      mockedPokemonListData.mockedDataPokemonList.length;

    const pokemonCardElement = await screen.findAllByTestId(
      /memo-pokemon-card/i,
    );
    expect(pokemonCardElement).toHaveLength(countCardsRendered);

    server.resetHandlers();
    server.close();
  });
});
