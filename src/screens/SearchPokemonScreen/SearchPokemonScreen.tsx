import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

import {
  Screen,
  Header,
  TextInputDropBox,
  Box,
  TextInput,
  BoxProps,
} from '@components';
import { Pokemon, usePokemonDetailsData } from '@domain';
import { useTextInput, useTextInputDropBox } from '@hooks';
import { usePokemonNamesService } from '@services';

import { SearchPokemonShowDetails } from './components/SearchPokemonShowDetails';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemonSuggestionName, setPokemonSuggestionName] = useState('');
  const [pokemon, setPokemon] = useState('');

  const { isConnected } = useNetInfo();
  const inputRef = useRef<RNTextInput>(null);

  const { onLayoutInput, positionY, width, isDropDownOpen, setIsDropDownOpen } =
    useTextInputDropBox();

  const {
    handleInputBlur,
    handleInputFocus,
    handleOnPressIcon,
    isFilled,
    isFocused,
  } = useTextInput({
    inputRef: inputRef,
    isDropDownOpen,
    setIsDropDownOpen,
    value: pokemon,
  });

  const {
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    isLoading,
    isInitialLoading,
    isError,
  } = usePokemonDetailsData(pokemon);

  const { pokemonNamesList, refetch } = usePokemonNamesService();

  function handleSetPokemon(name: Pokemon['name']) {
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
      disabled={!isDropDownOpen}
      onPress={handleInputBlur}>
      <Screen isKeyboardAvoidingViewEnabled={false}>
        <Header title="Localize 🔍" subTitle="Qual seu pokémon favorito?" />

        <Box flex={1}>
          <Box flex={1} style={{ marginTop: positionY + 10 }}>
            <SearchPokemonShowDetails
              isError={isError}
              isLoading={isLoading}
              isInitialLoading={isInitialLoading}
              fetchEvolutionPokemonDetails={handleSetPokemon}
              pokemonBasicDetailsData={pokemonBasicDetailsData}
              pokemonDetailsData={pokemonDetailsData}
              pokemonEvolutionsData={pokemonEvolutionsData}
              pokemon={pokemon}
              setPokemonName={handleSetPokemon}
            />
          </Box>

          <Box {...$textInputDropBox}>
            <TextInput
              key={textInputKey}
              ref={inputRef}
              onLayout={onLayoutInput}
              value={pokemonSuggestionName}
              onChangeText={setPokemonSuggestionName}
              placeholder="Encontre seu pokémon..."
              isDropDownOpen={isDropDownOpen}
              handleInputBlur={handleInputBlur}
              handleInputFocus={handleInputFocus}
              handleOnPressIcon={handleOnPressIcon}
              isFilled={isFilled}
              isFocused={isFocused}
            />
            {isDropDownOpen && (
              <TextInputDropBox
                initialDropBoxValue={pokemonNamesList}
                value={pokemonSuggestionName}
                setPokemonName={handleSetPokemon}
                width={width}
                closeDropBoxOnChoose={handleInputBlur}
              />
            )}
          </Box>
        </Box>
      </Screen>
    </TouchableWithoutFeedback>
  );
}

const $textInputDropBox: BoxProps = {
  height: '100%',
  zIndex: 1,
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
};
