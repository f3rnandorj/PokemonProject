import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Pokemon, usePokemonDetailsData } from '@domain';
import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import { usePokemonNamesService } from '@services';
import Orientation from 'react-native-orientation-locker';

import { Screen, Header, SearchComponent, Box } from '@components';
import { useAppTheme } from '@hooks';

import { SearchPokemonShowDetails } from './components/SearchPokemonShowDetails';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemonSuggestionName, setPokemonSuggestionName] = useState('');
  const [pokemon, setPokemon] = useState('');

  const { isConnected } = useNetInfo();

  const {
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    isLoading,
    isInitialLoading,
    isError,
  } = usePokemonDetailsData(pokemon);

  const { spacing } = useAppTheme();
  const { pokemonNamesList, refetch } = usePokemonNamesService();

  function setPokemonAdapted(name: Pokemon['name']) {
    setPokemonSuggestionName(name);
    setPokemon(name);
  }

  useFocusEffect(
    useCallback(() => {
      setTextInputKey(prevKey => prevKey + 1);
    }, []),
  );

  useEffect(() => {
    refetch();
    setTextInputKey(prev => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ marginHorizontal: spacing.ns16 }}>
      <Screen>
        <Header title="Localize 🔍" subTitle="Qual seu pokémon favorito?" />

        <Box zIndex={1}>
          <SearchComponent
            key={textInputKey}
            value={pokemonSuggestionName}
            onChangeText={setPokemonSuggestionName}
            placeholder="Encontre seu pokémon..."
            setPokemonName={setPokemonAdapted}
            initialDropBoxValue={pokemonNamesList}
          />
        </Box>

        <SearchPokemonShowDetails
          isError={isError}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
          fetchEvolutionPokemonDetails={setPokemonAdapted}
          pokemonBasicDetailsData={pokemonBasicDetailsData}
          pokemonDetailsData={pokemonDetailsData}
          pokemonEvolutionsData={pokemonEvolutionsData}
          pokemon={pokemon}
          setPokemonName={setPokemonAdapted}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
}
