import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar } from 'react-native';

import { Pokemon, usePokemonList } from '@domain';
import { useNetInfo } from '@react-native-community/netinfo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useToastService } from '@services';
import Orientation from 'react-native-orientation-locker';

import {
  Screen,
  MemoPokemonCard,
  LoadingDataScreen,
  Header,
  ImageBackGround,
} from '@components';
import { AppTabScreenProps } from '@routes';

import { Box } from './../../components/Box/Box';
import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeaderList } from './components/HomeHeaderList';

export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  const {
    list: pokemonData,
    isError,
    fetchNextPage,
    isLoading,
    isLoadingNextPage,
  } = usePokemonList();

  const tabBarHeight = useBottomTabBarHeight();
  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();

  const $listLoading = pokemonData?.length > 0 &&
    isLoadingNextPage && { opacity: 0.5 };
  const $emptyList =
    pokemonData?.length === 0 && (isLoading || isError)
      ? { flex: 1 }
      : { paddingBottom: tabBarHeight };

  function handleOpenPokemonDetails(item: Pokemon) {
    navigation.navigate('PokemonDetailsScreen', {
      pokemonName: item.name,
    });
  }

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

  function renderItem({ item, index }: ListRenderItemInfo<Pokemon>) {
    return (
      <MemoPokemonCard
        pokemon={item}
        index={index}
        onPress={() => handleOpenPokemonDetails(item)}
      />
    );
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

        <FlatList
          data={pokemonData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={[$emptyList, $listLoading]}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={handleFetchNextPage}
          onEndReachedThreshold={0.1}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
          ListHeaderComponent={<HomeHeaderList />}
          ListEmptyComponent={
            <HomeEmpty error={isError!} loading={isLoading} />
          }
        />
      </Box>
    </Screen>
  );
}
