import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageStyle,
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
} from 'react-native';

import { Pokemon, usePokemonDetailsData } from '@domain';
import { useFocusEffect } from '@react-navigation/native';

import {
  Screen,
  Header,
  TextInput,
  Box,
  Text,
  PokemonEvolutionsCard,
} from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import { Pokedex } from './components/Pokedex';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemonName, setPokemonName] = useState('');

  const {
    fetchEvolutionPokemonDetailsData,
    pokemonBasicDetailsData,
    pokemonEvolutionsData,
  } = usePokemonDetailsData('');

  const { spacing } = useAppTheme();

  const pokemonColor = pokemonBasicDetailsData?.types?.[0] as ThemeColors;

  // const pokemon =
  //   (pokemonBasicDetailsData?.name ?? '').charAt(0).toUpperCase() +
  //   (pokemonBasicDetailsData?.name ?? '').slice(1);

  function getPokemonName(name: Pokemon['name']) {
    setPokemonName(name);
  }

  function fetchEvolutionPokemonDetails(evolutionName: string) {
    fetchEvolutionPokemonDetailsData(evolutionName);
  }

  useFocusEffect(
    useCallback(() => {
      setTextInputKey(prevKey => prevKey + 1);
    }, []),
  );

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ marginHorizontal: spacing.ns16 }}>
      <Screen>
        <Header
          title="Localize Pokémons"
          subTitle="Qual seu pokémon favorito?"
        />

        <Box zIndex={1}>
          <TextInput
            key={textInputKey}
            value={pokemonName}
            onMewTwoButtonPress={() => {
              fetchEvolutionPokemonDetailsData(pokemonName);
            }}
            onChangeText={setPokemonName}
            placeholder="Encontre seu pokémon..."
            getPokemonName={getPokemonName}
          />
        </Box>

        <Box flex={1}>
          <Pokedex>
            {pokemonName === '' && pokemonBasicDetailsData ? (
              <Box>
                <Text />
              </Box>
            ) : (
              <Box>
                <Image
                  source={{
                    uri: pokemonBasicDetailsData?.avatarURL,
                  }}
                  defaultSource={{
                    uri: 'https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png?fit=512%2C512',
                  }}
                  style={[$imageStyle]}
                  resizeMode="contain"
                />

                <PokemonEvolutionsCard
                  {...pokemonEvolutionsData}
                  usage="searchScreen"
                  colorOfPokemon={pokemonColor}
                  fetchEvolutionPokemonDetails={fetchEvolutionPokemonDetails}
                />
              </Box>
            )}
          </Pokedex>
        </Box>
      </Screen>
    </TouchableWithoutFeedback>
  );
}

const $imageStyle: StyleProp<ImageStyle> = {
  zIndex: 1,
  width: 120,
  height: 120,
  alignSelf: 'center',
};
