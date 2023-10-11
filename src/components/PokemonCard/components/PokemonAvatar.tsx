import React from 'react';

import { Box, Text, PokemonAvatar as Avatar } from '@components';
import { Pokemon } from '@domain';

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
        <Avatar avatarURL={avatarURL} width={'100%'} height={'100%'} />
      </Box>
    </Box>
  );
}

export const MemoPokemonAvatar = React.memo(PokemonAvatar);
