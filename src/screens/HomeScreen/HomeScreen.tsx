import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar } from 'react-native';

import { Pokemon } from '@domain';
import Orientation from 'react-native-orientation-locker';

import { Screen, Text, PokemonCard, Box } from '@components';
import { useSharedData } from '@hooks';
import { AppScreenProps } from '@routes';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';

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
            id: item.id,
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
        keyExtractor={item => item.name}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HeaderList />}
        ListFooterComponent={<FooterComponent />}
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

function FooterComponent() {
  return (
    <Box alignItems="center" marginVertical="s16">
      <PokemonLogo />
    </Box>
  );
}
