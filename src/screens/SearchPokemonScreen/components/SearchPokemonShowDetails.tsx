import React, { useEffect } from 'react';
import { Image, ImageStyle, ScrollView, StyleProp } from 'react-native';

import { Pokemon, PokemonDetails, PokemonEvolutions } from '@domain';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import {
  Box,
  Button,
  MemoPokemonTypes,
  PokemonEvolutionsCard,
  Text,
} from '@components';
import { AppStackParamList } from '@routes';
import { ThemeColors } from '@theme';

import { Pokedex } from './Pokedex';
import { SearchPokemonEmpty } from './SearchPokemonEmpty';

interface Props {
  loadingPokemonDetailsData: boolean;
  errorToFetchPokemonDetailsData: boolean | null;
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
  pokemonEvolutionsData: PokemonEvolutions;
  fetchEvolutionPokemonDetails: (evolutionName: string) => void;
  pokemon: Pokemon['name'];
  setPokemonName: (name: string) => void;
}

export function SearchPokemonShowDetails(props: Props) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const pokemonColor = props.pokemonBasicDetailsData?.types?.[0] as ThemeColors;

  const pokemon =
    (props.pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
    (props.pokemonBasicDetailsData?.name ?? '').slice(1);

  useEffect(() => {
    props.setPokemonName(pokemon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  return (
    <Box flex={1}>
      <Pokedex>
        {props.loadingPokemonDetailsData ||
        props.errorToFetchPokemonDetailsData ||
        pokemon === '' ? (
          <SearchPokemonEmpty
            error={props.errorToFetchPokemonDetailsData}
            loading={props.loadingPokemonDetailsData}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              mt="s16"
              alignItems="center"
              onStartShouldSetResponder={() => true}>
              <Image
                source={{
                  uri: props.pokemonBasicDetailsData?.avatarURL,
                }}
                defaultSource={{
                  uri: 'https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png?fit=512%2C512',
                }}
                style={[$imageStyle]}
                resizeMode="contain"
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

              <MemoPokemonTypes
                types={props.pokemonBasicDetailsData?.types}
                isDetailsScreen
                mt="s10"
                mb="s22"
              />

              <Box flex={1}>
                <Text marginHorizontal="s6">
                  {props.pokemonDetailsData.description}
                </Text>
              </Box>

              <Button
                onPress={() =>
                  navigation.navigate('PokemonDetailsScreen', {
                    pokemonName: props.pokemonBasicDetailsData?.name,
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
