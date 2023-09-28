import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Pokemon, usePokemonDetailsData } from '@domain';
import { useFocusEffect } from '@react-navigation/native';
import { masks } from '@utils';

import { Screen, Header, TextInput } from '@components';
import { useAppTheme, useSharedData } from '@hooks';

import { SearchPokemonShowDetails } from './components/SearchPokemonShowDetails';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemonSuggestionName, setPokemonSuggestionName] = useState('');
  const [pokemon, setPokemon] = useState('');

  const {
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    isLoading,
    isInitialLoading,
    isError,
  } = usePokemonDetailsData(pokemon);

  const { spacing } = useAppTheme();
  const { pokemonNamesList } = useSharedData();

  function setPokemonSuggestion(name: Pokemon['name']) {
    const pokemonAdapted = masks.changeDotForHyphen(name);

    setPokemonSuggestionName(pokemonAdapted);
  }

  function fetchEvolutionPokemonDetails(evolutionName: string) {
    const pokemonAdapted = masks.changeDotForHyphen(evolutionName);

    setPokemon(pokemonAdapted);
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
          value={pokemonSuggestionName}
          onMewTwoButtonPress={() => {
            if (pokemon === pokemonSuggestionName) {
              return;
            }
            setPokemon(pokemonSuggestionName);
          }}
          onChangeText={setPokemonSuggestionName}
          placeholder="Encontre seu pokémon..."
          setPokemonName={setPokemonSuggestion}
          initialDropBoxValue={pokemonNamesList}
        />

        <SearchPokemonShowDetails
          isError={isError}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
          fetchEvolutionPokemonDetails={fetchEvolutionPokemonDetails}
          pokemonBasicDetailsData={pokemonBasicDetailsData}
          pokemonDetailsData={pokemonDetailsData}
          pokemonEvolutionsData={pokemonEvolutionsData}
          pokemon={pokemon}
          setPokemonName={setPokemonSuggestion}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
}
