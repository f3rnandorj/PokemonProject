import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import Orientation from 'react-native-orientation-locker';

import {
  Screen,
  LoadingDataScreen,
  Header,
  ImageBackGround,
} from '@components';
import { usePokemonList } from '@domain';
import { AppTabScreenProps } from '@routes';
import { useToastService } from '@services';

import { Box } from './../../components/Box/Box';
import { HomeList } from './components/HomeList';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {
    list: pokemonData,
    isError,
    fetchNextPage,
    isLoading,
    isLoadingNextPage,
  } = usePokemonList();

  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();

  function handleFetchNextPage() {
    if (isConnected === null) {
      return;
    }

    isConnected
      ? fetchNextPage()
      : showToast({
          message: 'Sem conexão com a internet!',
          type: 'error',
        });
  }

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    handleFetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <Screen>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Header title="Olá, Ash Ketchum" subTitle="Bem Vindo! 😄" />

      {((!isError && !isLoading) || pokemonData?.length > 0) && (
        <ImageBackGround screen="homeScreen" />
      )}

      <Box flex={1}>
        {pokemonData?.length > 0 && isLoadingNextPage && <LoadingDataScreen />}

        <HomeList
          fetchNextPage={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          isLoadingNextPage={isLoadingNextPage}
          pokemonData={pokemonData}
        />
      </Box>
    </Screen>
  );
}
