import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { MemoPokemonCard } from '@components';
import { Pokemon } from '@domain';
import { useToastService } from '@services';

import { HomeEmpty } from './HomeEmpty';
import { HomeHeaderList } from './HomeHeaderList';

interface Props {
  pokemonData: Pokemon[];
  isLoadingNextPage: boolean;
  isLoading: boolean;
  isError: boolean | null;
  fetchNextPage: () => void;
}

export function HomeList({
  isError,
  isLoading,
  isLoadingNextPage,
  pokemonData,
  fetchNextPage,
}: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();
  const navigation = useNavigation();

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
        testID="memo-pokemon-card"
        pokemon={item}
        index={index}
        onPress={() => handleOpenPokemonDetails(item)}
      />
    );
  }

  return (
    <FlatList
      data={pokemonData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={[$emptyList, $listLoading]}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      onEndReached={handleFetchNextPage}
      onEndReachedThreshold={0.15}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      ListHeaderComponent={<HomeHeaderList />}
      ListEmptyComponent={<HomeEmpty error={isError} loading={isLoading} />}
    />
  );
}
