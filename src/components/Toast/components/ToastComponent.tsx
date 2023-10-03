import React from 'react';
import { Dimensions } from 'react-native';

import { Toast, ToastPosition, ToastType, useToastService } from '@services';

import { useAppTheme } from '@hooks';

import { Box, BoxProps, TouchableOpacityBox } from '../../Box/Box';
import { Icon, IconProps } from '../../Icon/Icon';
import { Text } from '../../Text/Text';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

interface Props {
  toast: Toast;
}

export function ToastComponent({ toast }: Props) {
  const { hideToast } = useToastService();
  const { colors } = useAppTheme();

  const type: ToastType = toast?.type || 'success';
  const position: ToastPosition = toast?.position || 'top';

  return (
    <Box
      style={[
        $wrapper,
        {
          [position]: 80,
          backgroundColor: colors.secondary,
        },
      ]}>
      <Icon {...mapIconTypeToToast[type]} width={80} height={80} />
      <Text
        style={{ flexShrink: 1 }}
        preset="paragraphLarge"
        color="background"
        bold
        marginHorizontal="s20">
        {toast?.message}
      </Text>

      <TouchableOpacityBox onPress={toast?.action?.onPress || hideToast}>
        <Text preset="paragraphLarge" color="background" bold>
          X
        </Text>
      </TouchableOpacityBox>
    </Box>
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

const $wrapper: BoxProps['style'] = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 16,
  paddingHorizontal: 26,
  borderRadius: 24,
  maxWidth: MAX_WIDTH,
};
