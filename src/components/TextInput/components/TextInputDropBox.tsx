import React from 'react';
import { FlatList, ListRenderItemInfo, Platform } from 'react-native';

import { Pokemon } from '@domain';

import { Box, TouchableOpacityBox, Text, BoxProps } from '@components';
import { useSharedData } from '@hooks';

interface Props {
  positionY: number;
  width: number;
  setPokemonName: (name: Pokemon['name']) => void;
  value: string | undefined;
  closeDropBoxOnChoose: () => void;
}

export function TextInputDropBox({
  positionY,
  width,
  setPokemonName,
  value,
  closeDropBoxOnChoose,
}: Props) {
  const { pokemonNamesData } = useSharedData();

  const suggestionList =
    pokemonNamesData &&
    pokemonNamesData.filter(pokemon =>
      pokemon.toLowerCase().includes(value!.toLowerCase()),
    );

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <TouchableOpacityBox
        onPress={() => {
          setPokemonName(item);
          closeDropBoxOnChoose();
        }}
        {...$listItem}>
        <Text textAlign="center">{item}</Text>
      </TouchableOpacityBox>
    );
  }

  return (
    <Box {...$listWrapper} top={positionY} width={width}>
      <FlatList
        data={suggestionList}
        keyExtractor={item => item}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </Box>
  );
}

const $listItem: BoxProps = {
  pt: 's10',
  pb: 's10',
  mb: 's4',
  borderRadius: 's6',
  backgroundColor: 'backgroundContrastLight',
};

const $listWrapper: BoxProps = {
  zIndex: Platform.OS === 'ios' ? 0 : 1,
  flex: 1,
  alignSelf: 'center',
  position: 'absolute',
  height: 350,
};
