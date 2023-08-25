import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Screen, Box, Header, TextInput } from '@components';

export function SearchPokemonScreen() {
  const [text, setValue] = useState('');
  const [textInputKey, setTextInputKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setTextInputKey(prevKey => prevKey + 1);
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Header
          title="Localize Pokémons"
          subTitle="Qual seu pokémon favorito?"
        />

        <Box>
          <TextInput
            key={textInputKey}
            value={text}
            onChangeText={setValue}
            placeholder="Encontre seu pokémon..."
          />
        </Box>
      </Screen>
    </TouchableWithoutFeedback>
  );
}
