import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Pokemon, usePokemonDetailsData } from '@domain';
import { useFocusEffect } from '@react-navigation/native';

import { Screen, Header, TextInput } from '@components';
import { useAppTheme } from '@hooks';

import { SearchPokemonShowDetails } from './components/SearchPokemonShowDetails';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemon, setPokemon] = useState('');

  const {
    fetchEvolutionPokemonDetailsData,
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    loadingPokemonDetailsData,
    errorToFetchPokemonDetailsData,
  } = usePokemonDetailsData('');

  const { spacing } = useAppTheme();

  function setPokemonName(name: Pokemon['name']) {
    setPokemon(name);
  }

  function fetchEvolutionPokemonDetails(evolutionName: string) {
    if (evolutionName === '') {
      // TODO: use toast after created
      return;
    }

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

        <TextInput
          key={textInputKey}
          value={pokemon}
          onMewTwoButtonPress={() => {
            fetchEvolutionPokemonDetails(pokemon);
          }}
          onChangeText={setPokemonName}
          placeholder="Encontre seu pokémon..."
          setPokemonName={setPokemonName}
        />

        <SearchPokemonShowDetails
          errorToFetchPokemonDetailsData={errorToFetchPokemonDetailsData}
          fetchEvolutionPokemonDetails={fetchEvolutionPokemonDetails}
          loadingPokemonDetailsData={loadingPokemonDetailsData}
          pokemonBasicDetailsData={pokemonBasicDetailsData}
          pokemonDetailsData={pokemonDetailsData}
          pokemonEvolutionsData={pokemonEvolutionsData}
          pokemon={pokemon}
          setPokemonName={setPokemonName}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
}
