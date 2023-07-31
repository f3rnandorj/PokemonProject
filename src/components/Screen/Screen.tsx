import React from 'react';

import { Box, BoxProps, Icon } from '@components';
import { useAppSafeArea, useAppTheme } from '@hooks';

import {
  ScrollViewContainer,
  ViewContainer,
} from './components/ScreenContainer';
interface ScreenProps extends BoxProps {
  scrollable?: boolean;
  canGoBack?: boolean;
}

export function Screen({
  scrollable = false,
  children,
  canGoBack = false,
  ...boxProps
}: ScreenProps) {
  const { colors, spacing } = useAppTheme();
  const { top, bottom } = useAppSafeArea();

  const ScreenContainer = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <ScreenContainer backgroundColor={colors.background}>
      {canGoBack && (
        <Icon
          name="leftArrowIcon"
          width={35}
          height={35}
          style={{ marginLeft: spacing.s16, marginTop: top }}
        />
      )}
      <Box
        flex={1}
        marginHorizontal="s26"
        style={{ top, bottom }}
        {...boxProps}>
        {children}
      </Box>
    </ScreenContainer>
  );
}
