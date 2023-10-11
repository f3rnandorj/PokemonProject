import React from 'react';
import { ImageStyle, ScrollView, StyleProp } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import {
  Box,
  Button,
  FavoriteButton,
  ImageBackGround,
  MemoPokemonTypes,
  PokemonAvatar,
  PokemonEvolutionsCard,
  Text,
} from '@components';
import { Pokemon, PokemonDetails, PokemonEvolutions } from '@domain';
import { AppStackParamList } from '@routes';
import { useFavoritePokemonsService } from '@services';
import { ThemeColors } from '@theme';

import { Pokedex } from './Pokedex';
import { SearchPokemonEmpty } from './SearchPokemonEmpty';

interface Props {
  isLoading: boolean;
  isInitialLoading: boolean;
  isError: boolean | null;
  pokemonBasicDetailsData: Pokemon | undefined;
  pokemonDetailsData: PokemonDetails | undefined;
  pokemonEvolutionsData: PokemonEvolutions | undefined;
  fetchEvolutionPokemonDetails: (evolutionName: string) => void;
  pokemon: Pokemon['name'];
  setPokemonName: (name: string) => void;
}

export function SearchPokemonShowDetails(props: Props) {
  const { allFavoritePokemons } = useFavoritePokemonsService();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const pokemonColor = props.pokemonBasicDetailsData?.types?.[0] as ThemeColors;

  const pokemon =
    (props.pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
    (props.pokemonBasicDetailsData?.name ?? '').slice(1);

  const isFavorite = allFavoritePokemons?.some(
    poke => poke.id === props?.pokemonBasicDetailsData?.id,
  );

  return (
    <Box flex={1}>
      <Pokedex overflow="hidden">
        {props.isLoading ||
        props.isError ||
        props.pokemonBasicDetailsData === undefined ||
        props.pokemonDetailsData === undefined ||
        props.pokemonEvolutionsData === undefined ? (
          <>
            <ImageBackGround
              screen="searchScreen"
              style={{ left: -45, opacity: 0.5 }}
            />

            <SearchPokemonEmpty
              loading={props.isInitialLoading && props.isLoading}
            />
          </>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              mt="s16"
              alignItems="center"
              onStartShouldSetResponder={() => true}>
              <PokemonAvatar
                key={props.pokemonBasicDetailsData?.avatarURL}
                width={0}
                height={0}
                avatarURL={props.pokemonBasicDetailsData?.avatarURL}
                style={$imageStyle}
              />

              <PokemonEvolutionsCard
                {...props.pokemonEvolutionsData}
                usage="searchScreen"
                colorOfPokemon={pokemonColor}
                fetchEvolutionPokemonDetails={
                  props.fetchEvolutionPokemonDetails
                }
              />

              <Text
                preset="headerSmall"
                color={pokemonColor}
                textAlign="center">
                {pokemon}
              </Text>

              <Box
                bg="primary"
                borderRadius="s50"
                paddingHorizontal="s2"
                paddingVertical="s2"
                pb="s4">
                <FavoriteButton
                  isFavorite={isFavorite}
                  pokemonBasicDetailsData={props.pokemonBasicDetailsData}
                  pokemonDetailsData={props.pokemonDetailsData}
                />
              </Box>

              <MemoPokemonTypes
                types={props.pokemonBasicDetailsData?.types}
                isDetailsScreen
                mt="s10"
                mb="s22"
              />

              <Box flex={1}>
                <Text marginHorizontal="s10">
                  {props.pokemonDetailsData.description}
                </Text>
              </Box>

              <Button
                onPress={() =>
                  navigation.navigate('PokemonDetailsScreen', {
                    pokemonName: props?.pokemonBasicDetailsData?.name!,
                  })
                }
                backgroundColor={pokemonColor}
                marginVertical="s16"
                title="Ver mais detalhes"
              />
            </Box>
          </ScrollView>
        )}
      </Pokedex>
    </Box>
  );
}

const $imageStyle: StyleProp<ImageStyle> = {
  zIndex: 1,
  width: 120,
  height: 120,
  alignSelf: 'center',
};
