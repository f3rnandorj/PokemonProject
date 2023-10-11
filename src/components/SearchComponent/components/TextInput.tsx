import React, { useRef, useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  StyleProp,
  TextInput as SRTextInput,
  TextInputProps as SRTextInputProps,
  TextStyle,
} from 'react-native';

import { Pokemon } from '@domain';
import { useNetInfo } from '@react-native-community/netinfo';
import { useToastService } from '@services';

import { useAppTheme } from '@hooks';
import { $shadowProps } from '@theme';

import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { $fontFamily, $fontSize } from '../../Text/Text';

import { TextInputDropBox } from './TextInputDropBox';

export interface InputProps extends SRTextInputProps {
  setPokemonName: (name: Pokemon['name']) => void;
  initialDropBoxValue: string[] | undefined;
}

export function TextInput({
  value,
  setPokemonName,
  initialDropBoxValue,
  style,
  ...sRTextInputProps
}: InputProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [width, setWidth] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const { spacing, colors } = useAppTheme();
  const { isConnected } = useNetInfo();
  const { showToast } = useToastService();

  const inputRef = useRef<SRTextInput>(null);

  function onLayout(event: LayoutChangeEvent) {
    const height = event.nativeEvent.layout.height;

    setWidth(event.nativeEvent.layout.width);
    setPositionY(event.nativeEvent.layout.y + height);
  }

  function handleInputFocus() {
    setIsFocused(true);
    setIsDropDownOpen(true);
    inputRef?.current?.focus();
  }

  function handleInputBlur() {
    Keyboard.dismiss();
    setIsFocused(false);
    setIsFilled(!!value);
    setIsDropDownOpen(false);
  }

  function handleOnPress() {
    isConnected
      ? setIsDropDownOpen(prev => !prev)
      : showToast({
          message: 'Sem conexão com a internet!',
          type: 'error',
        });
  }

  return (
    <Box
      zIndex={0}
      borderColor={
        isFocused || isFilled ? 'primary' : 'backgroundContrastLight'
      }
      {...$wrapperInput}
      style={{ ...$shadowProps }}>
      <SRTextInput
        ref={inputRef}
        onLayout={onLayout}
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
          style,
        ]}
        {...sRTextInputProps}
      />

      <Icon
        width={16}
        height={12}
        justifyContent="center"
        name={isDropDownOpen ? 'ArrowUp' : 'ArrowDown'}
        onPress={handleOnPress}
        style={{
          paddingLeft: spacing.s10,
          paddingRight: spacing.s20,
        }}
      />

      {isDropDownOpen && (
        <TextInputDropBox
          positionY={positionY}
          width={width}
          setPokemonName={setPokemonName}
          value={value}
          closeDropBoxOnChoose={handleInputBlur}
          initialDropBoxValue={initialDropBoxValue}
        />
      )}
    </Box>
  );
}

const $wrapperInput: BoxProps = {
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  flexDirection: 'row',
  bg: 'backgroundContrastLight',
  borderRadius: 's50',
  borderWidth: 2,
  marginHorizontal: 's26',
};

const $inputStyle: StyleProp<TextStyle> = {
  height: '100%',
  width: '65%',
  fontFamily: $fontFamily.interRegular,
  fontSize: $fontSize.paragraphMedium.fontSize,
};
