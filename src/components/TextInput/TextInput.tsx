import React, { ForwardedRef } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TextInput as SRTextInput,
  TextInputProps as SRTextInputProps,
  TextStyle,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import Animated, { RollInLeft } from 'react-native-reanimated';

import { useAppTheme } from '@hooks';
import { $shadowProps } from '@theme';

import masterBall from '../../assets/brandPokeballs/masterball.png';
import { Box, BoxProps } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { $fontFamily, $fontSize } from '../Text/Text';

export interface InputProps extends SRTextInputProps {
  isDropDownOpen: boolean;
  isFocused: boolean;
  isFilled: boolean;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  handleOnPressIcon: () => void;
}

const IMG_SIZE = 65;
const INPUT_HEIGHT = IMG_SIZE - 10;

function Input(
  {
    value,
    isDropDownOpen,
    handleInputBlur,
    handleInputFocus,
    handleOnPressIcon,
    isFilled,
    isFocused,
    ...sRTextInputProps
  }: InputProps,
  ref: ForwardedRef<SRTextInput>,
) {
  if (!handleInputBlur || !handleInputBlur || !handleInputFocus) {
    throw new Error(
      'You must use useTextInput located on @hooks to pass required parameters!',
    );
  }

  const { spacing, colors } = useAppTheme();
  const { isConnected } = useNetInfo();

  return (
    <Box mt="s12" justifyContent="center">
      <Box
        borderColor={
          isFocused || isFilled ? 'primary' : 'backgroundContrastLight'
        }
        {...$wrapperInput}
        style={[{ ...$shadowProps }]}>
        <SRTextInput
          ref={ref}
          editable={isConnected!}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          autoCapitalize="none"
          placeholderTextColor={colors.secondary}
          style={[
            {
              textAlign: value ? 'center' : 'left',
              color: colors.backgroundContrast,
              marginLeft: spacing.s40,
              paddingVertical: spacing.s12,
            },
            $inputStyle,
          ]}
          {...sRTextInputProps}
        />

        <Icon
          width={16}
          height={12}
          justifyContent="center"
          name={isDropDownOpen ? 'ArrowUp' : 'ArrowDown'}
          onPress={handleOnPressIcon}
          style={{
            paddingLeft: spacing.s10,
            paddingRight: spacing.s20,
          }}
        />
      </Box>

      <Animated.View
        style={[$imgCommonStyle, { position: 'absolute' }]}
        entering={RollInLeft.duration(1000)}>
        <Image
          source={masterBall}
          style={$imgCommonStyle}
          resizeMode="contain"
        />
      </Animated.View>

      <Image
        source={{
          uri: 'https://projectpokemon.org/images/normal-sprite/mewtwo.gif',
        }}
        style={[
          $imgCommonStyle,
          {
            marginRight: spacing.ns12,
            right: 0,
            position: 'absolute',
          },
        ]}
        resizeMode="cover"
      />
    </Box>
  );
}

export const TextInput = React.forwardRef(Input);

const $wrapperInput: BoxProps = {
  justifyContent: 'center',
  flexDirection: 'row',
  bg: 'backgroundContrastLight',
  borderRadius: 's50',
  borderWidth: 2,
  marginHorizontal: 's26',
};

const $inputStyle: StyleProp<TextStyle> = {
  height: INPUT_HEIGHT,
  width: '65%',
  fontFamily: $fontFamily.interRegular,
  fontSize: $fontSize.paragraphMedium.fontSize,
};

const $imgCommonStyle: StyleProp<ImageStyle> = {
  height: IMG_SIZE,
  width: IMG_SIZE,
};
