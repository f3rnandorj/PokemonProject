import React from 'react';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Box, BoxProps } from '@components';

const MARGIN = 26;

interface Props extends BoxProps {}

export function Pokedex({ children, ...boxProps }: Props) {
  const barHeight = useBottomTabBarHeight();

  return (
    <Box {...$container} style={{ marginBottom: barHeight + MARGIN }}>
      <Box {...$topAndBottomWrapper}>
        <Box {...$topLeftAndRight} />

        <Box flex={2.5} flexDirection="column" bg="background">
          <Box flex={1} bg="background" />
          <Box flex={1.5} bg="backgroundHeader" ml="ns12" mr="ns12" />
        </Box>

        <Box {...$topLeftAndRight} />
      </Box>

      <Box {...$middleWrapper}>
        <Box flex={0.5} />
        <Box flex={2.5} bg="background" {...boxProps}>
          {children}
        </Box>
        <Box flex={0.5} />
      </Box>

      <Box {...$topAndBottomWrapper}>
        <Box {...$bottomLeftAndRight} />

        <Box flex={2.5} flexDirection="column" bg="background">
          <Box flex={1.5} bg="backgroundHeader" ml="ns12" mr="ns12" />
          <Box flex={1} bg="background" />
        </Box>

        <Box {...$bottomLeftAndRight} />
      </Box>
    </Box>
  );
}

const $container: BoxProps = {
  flex: 1,
  bg: 'backgroundHeader',
  mt: 's16',
};

const $topAndBottomWrapper: BoxProps = {
  flex: 0.5,
  flexDirection: 'row',
  bg: 'background',
};

const $middleWrapper: BoxProps = {
  flex: 5.5,
  flexDirection: 'row',
  bg: 'backgroundHeader',
};

const $bottomLeftAndRight: BoxProps = {
  flex: 0.5,
  bg: 'backgroundHeader',
  borderBottomLeftRadius: 's50',
  borderBottomRightRadius: 's50',
};

const $topLeftAndRight: BoxProps = {
  flex: 0.5,
  bg: 'backgroundHeader',
  borderTopLeftRadius: 's50',
  borderTopRightRadius: 's50',
  mb: 'ns12',
};
