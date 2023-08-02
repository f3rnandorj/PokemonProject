import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar } from 'react-native';

import { pokemonService, Pokemon } from '@domain';

import { Screen, Text, PokemonCard } from '@components';
import { AppScreenProps } from '@routes';

import { MainHeader } from './components/MainHeader';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>();

  function renderItem({ item, index }: ListRenderItemInfo<Pokemon>) {
    return (
      <PokemonCard
        pokemon={item}
        index={index}
        onPress={() => navigation.navigate('PokemonDetailsScreen')}
      />
    );
  }

  useEffect(() => {
    pokemonService
      .getListOfPokemon()
      .then(listOfPokemons => setAllPokemons(listOfPokemons))
      .catch(e => console.log(e.message));
  }, []);

  return (
    <Screen>
      <StatusBar backgroundColor="transparent" translucent />
      <MainHeader />
      <Text preset="headerMedium" semiBold mt="s40" mb="s40">
        Qual pokémon você{'\n'}escolheria?
      </Text>

      <FlatList
        data={allPokemons}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </Screen>
  );
}
