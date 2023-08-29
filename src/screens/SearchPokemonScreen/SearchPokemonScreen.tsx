import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Pokemon } from '@domain';
import { useFocusEffect } from '@react-navigation/native';

import { Screen, Header, TextInput } from '@components';
import { useAppTheme } from '@hooks';

export function SearchPokemonScreen() {
  const [textInputKey, setTextInputKey] = useState(0);
  const [pokemonName, setPokemonName] = useState('');

  const { spacing } = useAppTheme();

  function getPokemonName(name: Pokemon['name']) {
    setPokemonName(name);
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
          value={pokemonName}
          onChangeText={setPokemonName}
          placeholder="Encontre seu pokémon..."
          getPokemonName={getPokemonName}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
}
