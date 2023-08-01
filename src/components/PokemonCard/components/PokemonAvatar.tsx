import React from 'react';
import { Image } from 'react-native';

import { Pokemon } from '@domain';

import { Box, Text } from '@components';

type Props = Pick<Pokemon, 'id' | 'avatarURL'>;

export function PokemonAvatar({ id, avatarURL }: Props) {
  return (
    <Box flex={1} marginVertical="s6">
      <Text
        preset="headerCaptionSmall"
        color="backgroundContrastLight"
        medium
        mt="ns12"
        textAlign="right">
        #{id.padStart(3, '0')}
      </Text>
      <Box flex={1} mb="ns28" mr="ns12" flexWrap="wrap">
        <Image
          source={{
            uri: `${avatarURL}`,
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </Box>
    </Box>
  );
}
