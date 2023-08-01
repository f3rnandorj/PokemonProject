import React from 'react';

import { Pokemon } from '@domain';

import { Box, Text } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

type Props = Pick<Pokemon, 'name' | 'types'>;

export function PokemonInfos({ name, types }: Props) {
  const { colors, spacing } = useAppTheme();

  return (
    <Box flex={1}>
      <Box flexWrap="wrap" mb="s8">
        <Text preset="cardHeader" color="background" semiBold numberOfLines={1}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </Box>

      <Box>
        {types.map((typeName, idx) => {
          const backgroundTypeColor =
            colors[`${typeName}Light` as ThemeColors] || colors.normal;

          const marginBottom = idx === 0 ? spacing.s6 : 0;

          return (
            <Box
              key={typeName}
              justifyContent="center"
              alignItems="center"
              borderRadius="s24"
              style={{
                backgroundColor: backgroundTypeColor,
                marginBottom,
              }}>
              <Text preset="cardMedium" color="backgroundContrastLight" medium>
                {typeName}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
