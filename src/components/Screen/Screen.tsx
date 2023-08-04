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
  color?: BoxProps['backgroundColor'];
}

export function Screen({
  scrollable = false,
  children,
  color = 'background',
  canGoBack = false,
  style,
  ...boxProps
}: ScreenProps) {
  const { colors, spacing } = useAppTheme();
  const { top } = useAppSafeArea();

  const ScreenContainer = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <ScreenContainer backgroundColor={colors[color]}>
      {canGoBack && (
        <Icon
          name="leftArrowIcon"
          width={35}
          height={35}
          color="background"
          style={{ marginLeft: spacing.s16, marginTop: top }}
        />
      )}
      <Box
        flex={1}
        marginHorizontal="s26"
        style={[{ marginTop: top }, style]}
        {...boxProps}>
        {children}
      </Box>
    </ScreenContainer>
  );
}
