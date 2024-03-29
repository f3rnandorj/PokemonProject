import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import {
  Screen,
  Header,
  FavoritePokemonCard,
  Text,
  ImageBackGround,
} from '@components';
import { useAppTheme } from '@hooks';
import { AppTabScreenProps } from '@routes';
import { FavoritePokemon, useFavoritePokemonsService } from '@services';

export function FavoritePokemonScreen({
  navigation,
}: AppTabScreenProps<'FavoritePokemonScreen'>) {
  const { allFavoritePokemons, getAllFavoritePokemons } =
    useFavoritePokemonsService();
  const { spacing } = useAppTheme();

  const tabBarHeight = useBottomTabBarHeight();
  const $emptyList =
    allFavoritePokemons?.length === 0
      ? { flex: 1 }
      : { paddingBottom: tabBarHeight + spacing.s16 };

  function renderItem({ item }: ListRenderItemInfo<FavoritePokemon>) {
    return (
      <FavoritePokemonCard
        onPress={() =>
          navigation.navigate('PokemonDetailsScreen', {
            pokemonName: item.name,
          })
        }
        isFavorite={item?.isFavorite}
        {...item}
      />
    );
  }

  useEffect(() => {
    getAllFavoritePokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFavoritePokemons?.length]);

  return (
    <Screen>
      <Header title="Favoritos ⭐" subTitle="Veja sua coleção" />

      <ImageBackGround screen="favoriteScreen">
        {allFavoritePokemons?.length === 0 && (
          <Text textAlign="center" mt="ns40">
            Ops..Você não possui nenhum pokemon favorito.
          </Text>
        )}
      </ImageBackGround>

      <FlatList
        data={allFavoritePokemons}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={$emptyList}
      />
    </Screen>
  );
}
