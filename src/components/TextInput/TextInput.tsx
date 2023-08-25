import React, { forwardRef, Ref, useState } from 'react';
import {
  Image,
  Keyboard,
  TextInput as SRTextInput,
  TextInputProps as SRTextInputProps,
} from 'react-native';

import Animated, { RollInLeft } from 'react-native-reanimated';

import { useAppTheme } from '@hooks';
import { $shadowProps } from '@theme';

import masterBall from '../../assets/brandPokeballs/masterball.png';
import { Box } from '../Box/Box';
import { $fontFamily, $fontSize } from '../Text/Text';

export interface InputProps extends SRTextInputProps {}

export function Input(
  { value, ...sRTextInputProps }: InputProps,
  ref: Ref<SRTextInput>,
) {
  const { spacing, colors } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    Keyboard.dismiss();
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Box>
      <Box
        borderRadius="s50"
        flexDirection="row"
        alignSelf="center"
        width={'70%'}
        mt="s16"
        bg="backgroundContrastLight"
        borderWidth={2}
        paddingVertical="s6"
        borderColor={
          isFocused || isFilled ? 'backgroundHeader' : 'backgroundContrastLight'
        }
        style={{ ...$shadowProps }}>
        <SRTextInput
          ref={ref}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          autoCapitalize="none"
          placeholderTextColor={colors.backgroundContrastMedium}
          style={{
            fontFamily: $fontFamily.interRegular,
            fontSize: $fontSize.paragraphMedium.fontSize,
            color: colors.backgroundContrast,
            paddingLeft: spacing.s40,
            paddingRight: spacing.s20,
            width: '100%',
            padding: 0,
          }}
          {...sRTextInputProps}
        />
      </Box>

      <Animated.View
        entering={RollInLeft.duration(1000)}
        style={{ position: 'absolute', top: 7 }}>
        <Image
          source={masterBall}
          style={{ height: 60 }}
          resizeMode="contain"
        />
      </Animated.View>

      <Image
        source={{
          uri: 'https://projectpokemon.org/images/normal-sprite/mewtwo.gif',
        }}
        style={{
          height: 100,
          width: 100,
          position: 'absolute',
          top: -15,
          right: 3,
        }}
        resizeMode="contain"
      />
    </Box>
  );
}

export const TextInput = forwardRef(Input);
