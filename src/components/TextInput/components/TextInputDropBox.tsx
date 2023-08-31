import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Pokemon } from '@domain';

import { Box, TouchableOpacityBox, Text, BoxProps } from '@components';
import { useSharedData } from '@hooks';

interface Props {
  positionY: number;
  width: number;
  getPokemonName: (name: Pokemon['name']) => void;
  value: string | undefined;
  closeDropBoxOnChoose: () => void;
}

export function TextInputDropBox({
  positionY,
  width,
  getPokemonName,
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
          getPokemonName(item);
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
  // pl: 's32',
  mb: 's4',
  borderRadius: 's6',
  backgroundColor: 'backgroundContrastLight',
};

const $listWrapper: BoxProps = {
  flex: 1,
  alignSelf: 'center',
  position: 'absolute',
  height: 350,
};
