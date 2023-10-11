import React from 'react';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Box, BoxProps } from '@components';

const MARGIN = 26;

interface Props extends BoxProps {}

export function Pokedex({ children, style, ...boxProps }: Props) {
  const barHeight = useBottomTabBarHeight();

  return (
    <Box {...$container} style={{ marginBottom: barHeight + MARGIN }}>
      <Box {...$topAndBottomWrapper}>
        <Box {...$topLeftAndRight} />

        <Box flex={2.5} flexDirection="column" bg="background">
          <Box flex={1} bg="background" />
          <Box flex={1.5} bg="primary" ml="ns12" mr="ns12" />
        </Box>

        <Box {...$topLeftAndRight} />
      </Box>

      <Box {...$middleWrapper}>
        <Box flex={0.5} />
        <Box
          flex={2.5}
          bg="background"
          borderRadius="s6"
          style={[style]}
          {...boxProps}>
          {children}
        </Box>
        <Box flex={0.5} />
      </Box>

      <Box {...$topAndBottomWrapper}>
        <Box {...$bottomLeftAndRight} />

        <Box flex={2.5} flexDirection="column" bg="background">
          <Box flex={1.5} bg="primary" ml="ns12" mr="ns12" />
          <Box flex={1} bg="background" />
        </Box>

        <Box {...$bottomLeftAndRight} />
      </Box>
    </Box>
  );
}

const $container: BoxProps = {
  flex: 1,
  bg: 'primary',
  mt: 's16',
  borderRadius: 's14',
};

const $topAndBottomWrapper: BoxProps = {
  flex: 0.5,
  flexDirection: 'row',
  bg: 'background',
  borderRadius: 's14',
};

const $middleWrapper: BoxProps = {
  flex: 5.5,
  flexDirection: 'row',
  bg: 'primary',
  borderRadius: 's14',
};

const $bottomLeftAndRight: BoxProps = {
  flex: 0.5,
  bg: 'primary',
  borderBottomLeftRadius: 's50',
  borderBottomRightRadius: 's50',
};

const $topLeftAndRight: BoxProps = {
  flex: 0.5,
  bg: 'primary',
  borderTopLeftRadius: 's50',
  borderTopRightRadius: 's50',
  mb: 'ns12',
  borderRadius: 's50',
};
