import React from 'react';

import { Box, BoxProps } from '@components';
import { useAppTheme } from '@hooks';

import {
  ScrollViewContainer,
  ViewContainer,
} from './components/ScreenContainer';

interface ScreenProps extends BoxProps {
  scrollable?: boolean;
}

export function Screen({
  scrollable = false,
  children,
  ...boxProps
}: ScreenProps) {
  const { colors } = useAppTheme();

  const ScreenContainer = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <ScreenContainer backgroundColor={colors.background}>
      <Box marginHorizontal="s20" {...boxProps}>
        {children}
      </Box>
    </ScreenContainer>
  );
}
