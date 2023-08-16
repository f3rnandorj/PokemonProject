import React, { useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Pokemon, usePokemonData } from '@domain';
import Orientation from 'react-native-orientation-locker';

import { Screen, Text, MemoPokemonCard } from '@components';
import { AppScreenProps } from '@routes';

import { FooterHomeList } from './components/FooterHomeList';
import { HomeEmpty } from './components/HomeEmpty';
import { MainHeader } from './components/MainHeader';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const {
    pokemonData,
    errorToFetchPokemonData,
    loadingPokemonData,
    fetchNextPage,
  } = usePokemonData();

  function renderItem({ item, index }: ListRenderItemInfo<Pokemon>) {
    return (
      <MemoPokemonCard
        pokemon={item}
        index={index}
        onPress={() =>
          navigation.navigate('PokemonDetailsScreen', {
            pokemonName: item.name,
          })
        }
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
      <MainHeader />

      <FlatList
        data={pokemonData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={pokemonData.length === 0 ? $flatListStyle : {}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        ListHeaderComponent={<HeaderList />}
        ListFooterComponent={
          <FooterHomeList
            loadingPokemonData={loadingPokemonData}
            hasData={pokemonData.length > 0}
          />
        }
        ListEmptyComponent={
          <HomeEmpty
            error={errorToFetchPokemonData!}
            loading={loadingPokemonData}
          />
        }
      />
    </Screen>
  );
}

function HeaderList() {
  return (
    <Text preset="headerMedium" semiBold mt="s40" mb="s40">
      Qual pokémon você{'\n'}escolheria?
    </Text>
  );
}

const $flatListStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: 'space-between',
};
