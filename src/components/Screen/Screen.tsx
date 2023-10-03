import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Box, BoxProps, Icon } from '@components';
import { useAppSafeArea, useAppTheme } from '@hooks';

import { scrollWrapper, ViewContainer } from './components/ScreenContainer';
interface ScreenProps extends BoxProps {
  scrollable?: boolean;
  scrollForm?: 'animated' | 'normal';
  canGoBack?: boolean;
  color?: BoxProps['backgroundColor'];
}

export function Screen({
  scrollable = false,
  scrollForm = 'normal',
  children,
  color = 'background',
  canGoBack = false,
  style,
  ...boxProps
}: ScreenProps) {
  const { colors, spacing } = useAppTheme();
  const { top } = useAppSafeArea();
  const { goBack } = useNavigation();

  const ScreenContainer = scrollable
    ? scrollWrapper[scrollForm]
    : ViewContainer;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <ScreenContainer backgroundColor={colors[color]}>
        <Box flex={1} style={{ marginTop: top }}>
          {canGoBack && (
            <Icon
              onPress={goBack}
              name="leftArrowIcon"
              width={35}
              height={35}
              color="background"
              style={{ marginLeft: spacing.s16 }}
            />
          )}
          <Box flex={1} paddingHorizontal="s26" style={[style]} {...boxProps}>
            {children}
          </Box>
        </Box>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
