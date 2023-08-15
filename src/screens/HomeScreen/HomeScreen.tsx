import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Pokemon } from '@domain';
import Orientation from 'react-native-orientation-locker';

import { Screen, Text, Box, MemoPokemonCard } from '@components';
import { useSharedData } from '@hooks';
import { AppScreenProps } from '@routes';

import PokemonLogo from '../../assets/brand/pokemonLogo.svg';

import { useAppTheme } from './../../hooks/useAppTheme';
import { HomeEmpty } from './components/HomeEmpty';
import { MainHeader } from './components/MainHeader';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const {
    pokemonData,
    fetchNextPage,
    errorToFetchPokemonData,
    loadingPokemonData,
  } = useSharedData();

  function renderItem({ item, index }: ListRenderItemInfo<Pokemon>) {
    return (
      <MemoPokemonCard
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
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={pokemonData.length === 0 ? $flatListStyle : {}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        initialNumToRender={100}
        maxToRenderPerBatch={50}
        ListHeaderComponent={<HeaderList />}
        ListFooterComponent={<FooterComponent />}
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

function FooterComponent() {
  const { loadingPokemonData, pokemonData } = useSharedData();
  const { colors } = useAppTheme();

  return (
    <Box alignItems="center" marginVertical="s16">
      {loadingPokemonData && pokemonData.length > 0 ? (
        <Box>
          <ActivityIndicator size="small" color={colors.backgroundContrast} />
          <Text preset="headerSmall" bold textAlign="center">
            Carregando...
          </Text>
        </Box>
      ) : (
        <PokemonLogo />
      )}
    </Box>
  );
}

const $flatListStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: 'space-between',
};
