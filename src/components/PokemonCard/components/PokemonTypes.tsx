import React from 'react';

import { Pokemon } from '@domain';

import { Box, BoxProps, Text } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

type Props = {
  isDetailsScreen?: boolean;
} & Pick<Pokemon, 'types'> &
  BoxProps;

function PokemonTypes({ types, isDetailsScreen = false, ...boxProps }: Props) {
  const { colors, spacing } = useAppTheme();

  return (
    <Box flexDirection={isDetailsScreen ? 'row' : 'column'} {...boxProps}>
      {types?.map((typeName, idx) => {
        const backgroundTypeColor =
          colors[`${typeName}Light` as ThemeColors] || colors.normal;

        const margin = idx === 0 ? spacing.s8 : 0;

        return (
          <Box
            key={typeName}
            justifyContent="center"
            alignItems="center"
            borderRadius="s24"
            style={[
              { backgroundColor: backgroundTypeColor },
              isDetailsScreen
                ? {
                    marginRight: margin,
                    paddingHorizontal: spacing.s26,
                    paddingVertical: spacing.s6,
                  }
                : {
                    marginBottom: margin,
                  },
            ]}>
            <Text preset="cardMedium" color="backgroundContrastLight" medium>
              {typeName}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}

export const MemoPokemonTypes = React.memo(PokemonTypes);
