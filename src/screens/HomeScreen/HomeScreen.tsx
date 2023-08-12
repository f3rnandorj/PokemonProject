import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar } from 'react-native';

import { Pokemon } from '@domain';
import Orientation from 'react-native-orientation-locker';

import { Screen, Text, PokemonCard } from '@components';
import { useSharedData } from '@hooks';
import { AppScreenProps } from '@routes';

import { MainHeader } from './components/MainHeader';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const { pokemonData } = useSharedData();

  function renderItem({ item, index }: ListRenderItemInfo<Pokemon>) {
    return (
      <PokemonCard
        pokemon={item}
        index={index}
        onPress={() =>
          navigation.navigate('PokemonDetailsScreen', {
            id: Number(item.id) - 1,
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
      <Text preset="headerMedium" semiBold mt="s40" mb="s40">
        Qual pokémon você{'\n'}escolheria?
      </Text>

      <FlatList
        data={pokemonData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
