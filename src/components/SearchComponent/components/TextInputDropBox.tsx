import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Pokemon } from '@domain';

import { Box, TouchableOpacityBox, Text, BoxProps } from '@components';
import { useAppTheme } from '@hooks';

interface Props {
  positionY: number;
  width: number;
  setPokemonName: (name: Pokemon['name']) => void;
  value: string | undefined;
  closeDropBoxOnChoose: () => void;
  initialDropBoxValue: string[] | undefined;
}

export function TextInputDropBox({
  positionY,
  width,
  setPokemonName,
  value,
  closeDropBoxOnChoose,
  initialDropBoxValue,
}: Props) {
  const { spacing } = useAppTheme();

  const suggestionList = initialDropBoxValue?.filter(pokemon =>
    pokemon.toLowerCase().includes(value!.toLowerCase()),
  );

  function renderItem({ item, index }: ListRenderItemInfo<string>) {
    const lastItem = index === suggestionList?.length! - 1;
    return (
      <TouchableOpacityBox
        activeOpacity={0.9}
        onPress={() => {
          setPokemonName(item);
          closeDropBoxOnChoose();
        }}
        {...$listItem}
        style={{ marginBottom: lastItem ? spacing.s6 : 0 }}>
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
  mt: 's6',
  borderRadius: 's6',
  backgroundColor: 'backgroundContrastLight',
};

const $listWrapper: BoxProps = {
  flex: 1,
  alignSelf: 'center',
  position: 'absolute',
  bg: 'backgroundContrast',
  paddingHorizontal: 's6',
  marginVertical: 's6',
  borderRadius: 's14',
};
