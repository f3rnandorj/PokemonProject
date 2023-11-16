import React, { memo } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';

import { Box, Text } from '@components';
import { useAppTheme } from '@hooks';

function Loading() {
  const { colors } = useAppTheme();

  return (
    <Box
      testID="loading-data"
      flex={1}
      mt="ns40"
      justifyContent="center"
      alignItems="center"
      style={$wrapperLoading}>
      <ActivityIndicator size="large" color={colors.backgroundContrast} />
      <Text preset="headerSmall" bold textAlign="center">
        Carregando...
      </Text>
    </Box>
  );
}

export const LoadingDataScreen = memo(Loading);

const $wrapperLoading: ViewStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  top: 0,
  left: -26,
  right: -26,
  bottom: 0,
};
