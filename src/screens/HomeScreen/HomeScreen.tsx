import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar } from 'react-native';

import { Pokemon, usePokemonData } from '@domain';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Orientation from 'react-native-orientation-locker';

import {
  Screen,
  MemoPokemonCard,
  LoadingDataScreen,
  Header,
} from '@components';
import { AppTabScreenProps } from '@routes';

import { Box } from './../../components/Box/Box';
import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeaderList } from './components/HomeHeaderList';

export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  const {
    pokemonData,
    errorToFetchPokemonData,
    loadingPokemonData,
    fetchNextPage,
  } = usePokemonData();

  const tabBarHeight = useBottomTabBarHeight();

  function handleOpenPokemonDetails(item: Pokemon) {
    navigation.navigate('PokemonDetailsScreen', {
      pokemonName: item.name,
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

  return (
    <Screen>
      <StatusBar backgroundColor="transparent" translucent />
      <Header title="Olá, Ash Ketchum" subTitle="Bem Vindo! 😄" />

      <Box flex={1}>
        {pokemonData.length > 0 && loadingPokemonData && <LoadingDataScreen />}

        <FlatList
          data={pokemonData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={[
            pokemonData.length === 0 && loadingPokemonData
              ? { flex: 1 }
              : { paddingBottom: tabBarHeight },
            pokemonData.length > 0 && loadingPokemonData && { opacity: 0.5 },
          ]}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
          ListHeaderComponent={<HomeHeaderList />}
          ListEmptyComponent={
            <HomeEmpty
              error={errorToFetchPokemonData!}
              loading={loadingPokemonData}
            />
          }
        />
      </Box>
    </Screen>
  );
}
