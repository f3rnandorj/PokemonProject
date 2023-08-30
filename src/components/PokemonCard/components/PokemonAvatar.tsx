import React from 'react';
import { Image } from 'react-native';

import { Pokemon } from '@domain';

import { Box, Text } from '@components';

type Props = Pick<Pokemon, 'id' | 'avatarURL'>;

function PokemonAvatar({ id, avatarURL }: Props) {
  return (
    <Box flex={1} marginVertical="s2">
      <Text
        preset="headerCaptionSmall"
        color="backgroundContrastLight"
        medium
        mt="ns16"
        textAlign="right">
        # {String(id).padStart(4, '0')}
      </Text>

      <Box flex={1} mb="ns30" mr="ns16" flexWrap="wrap">
        <Image
          source={{
            uri: `${avatarURL}`,
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />
      </Box>
    </Box>
  );
}

export const MemoPokemonAvatar = React.memo(PokemonAvatar);
