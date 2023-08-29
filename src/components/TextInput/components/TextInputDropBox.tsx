import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Pokemon } from '@domain';

import { Box, TouchableOpacityBox, Text, BoxProps } from '@components';

interface Props {
  positionY: number;
  width: number;
  getPokemonName: (name: Pokemon['name']) => void;
  value: string | undefined;
  closeDropBoxOnChoose: () => void;
}

interface MockProps {
  name: string;
}

const mockData = Array.from({ length: 50 }, (_, index) => ({
  name: `Item ${index + 1}`,
}));

export function TextInputDropBox({
  positionY,
  width,
  getPokemonName,
  value,
  closeDropBoxOnChoose,
}: Props) {
  const suggestionList =
    mockData &&
    mockData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value!.toLowerCase()),
    );

  function renderItem({ item }: ListRenderItemInfo<MockProps>) {
    return (
      <TouchableOpacityBox
        onPress={() => {
          getPokemonName(item.name);
          closeDropBoxOnChoose();
        }}
        {...$listItem}>
        <Text>{item.name}</Text>
      </TouchableOpacityBox>
    );
  }

  return (
    <Box {...$listWrapper} top={positionY} width={width}>
      <FlatList
        data={suggestionList}
        keyExtractor={item => item.name}
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
  pl: 's40',
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
