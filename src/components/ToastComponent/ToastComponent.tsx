import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

import { ToastPosition, ToastType, useToast, useToastService } from '@services';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { $shadowProps } from '@theme';

import { Box, BoxProps, TouchableOpacityBox } from '../Box/Box';
import { Icon, IconProps } from '../Icon/Icon';
import { Text } from '../Text/Text';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

export function ToastComponent() {
  const toast = useToast();
  const { hideToast } = useToastService();

  const type: ToastType = toast?.type || 'success';
  const position: ToastPosition = toast?.position || 'top';

  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, toast?.duration || 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!toast) {
    return;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={{ position: 'absolute', alignSelf: 'center' }}>
      <Box {...$wrapper} style={[{ [position]: 80 }, $shadowProps]}>
        <Icon {...mapIconTypeToToast[type]} width={80} height={80} />
        <Text
          style={{ flexShrink: 1 }}
          preset="paragraphLarge"
          color="background"
          bold
          marginHorizontal="s20">
          {toast?.message}Hello world
        </Text>

        <TouchableOpacityBox>
          <Text preset="paragraphLarge" color="background" bold>
            X
          </Text>
        </TouchableOpacityBox>
      </Box>
    </Animated.View>
  );
}

type IconMap = Pick<IconProps, 'color' | 'name'>;
const mapIconTypeToToast: Record<ToastType, IconMap> = {
  success: {
    name: 'successIcon',
    color: 'success',
  },
  error: {
    name: 'errorIcon',
    color: 'error',
  },
};

const $wrapper: BoxProps = {
  flexDirection: 'row',

  alignItems: 'center',
  paddingVertical: 's16',
  paddingHorizontal: 's26',
  borderRadius: 's24',
  bg: 'primary',
  maxWidth: MAX_WIDTH,
};
