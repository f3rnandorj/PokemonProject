import React, { PropsWithChildren, useRef, useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  Platform,
  TextInput as SRTextInput,
  TextInputProps as SRTextInputProps,
} from 'react-native';

import { Pokemon } from '@domain';

import { useAppTheme } from '@hooks';
import { $shadowProps } from '@theme';

import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { $fontFamily, $fontSize } from '../Text/Text';

import { AnimatedTextInputImages } from './components/AnimatedTextInputImages';
import { TextInputDropBox } from './components/TextInputDropBox';

export interface InputProps extends SRTextInputProps {
  setPokemonName: (name: Pokemon['name']) => void;
  onMewTwoButtonPress: () => void;
}

const MARGIN_TOP = 16;
const INPUT_MARGIN_ADDITIONAL = 30;

export function TextInput({
  value,
  setPokemonName,
  onMewTwoButtonPress,
  style,
  ...sRTextInputProps
}: InputProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [width, setWidth] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const { spacing, colors } = useAppTheme();

  const inputRef = useRef<SRTextInput>(null);

  function onLayout(event: LayoutChangeEvent) {
    const height = event.nativeEvent.layout.height;

    setWidth(event.nativeEvent.layout.width + INPUT_MARGIN_ADDITIONAL);
    setPositionY(event.nativeEvent.layout.y + height * 2 + MARGIN_TOP);
  }

  function handleInputFocus() {
    setIsFocused(true);
    setIsDropDownOpen(true);
    setPokemonName('');
    inputRef?.current?.focus();
  }

  function handleInputBlur() {
    Keyboard.dismiss();
    setIsFocused(false);
    setIsFilled(!!value);
    setIsDropDownOpen(false);
  }

  return (
    <ContainerBoxForPlatform>
      <Box>
        <Box
          borderRadius="s50"
          flexDirection="row"
          alignSelf="center"
          width={'70%'}
          bg="backgroundContrastLight"
          borderWidth={2}
          paddingVertical="s6"
          borderColor={
            isFocused || isFilled ? 'primary' : 'backgroundContrastLight'
          }
          style={{ ...$shadowProps, marginTop: MARGIN_TOP }}>
          <SRTextInput
            ref={inputRef}
            onLayout={onLayout}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={colors.secondary}
            style={[
              {
                flex: 1,
                textAlign: value ? 'center' : 'left',
                fontFamily: $fontFamily.interRegular,
                fontSize: $fontSize.paragraphMedium.fontSize,
                color: colors.backgroundContrast,
                marginLeft: spacing.s40,
                width: '100%',
                paddingVertical: Platform.OS === 'android' ? 0 : spacing.s6,
              },
              style,
            ]}
            {...sRTextInputProps}
          />

          <Icon
            width={16}
            height={12}
            justifyContent="center"
            name={isDropDownOpen ? 'ArrowUp' : 'ArrowDown'}
            onPress={() => setIsDropDownOpen(prev => !prev)}
            style={{
              marginLeft: spacing.s10,
              marginRight: spacing.s12,
            }}
          />
        </Box>

        {isDropDownOpen && (
          <TextInputDropBox
            positionY={positionY}
            width={width}
            setPokemonName={setPokemonName}
            value={value}
            closeDropBoxOnChoose={handleInputBlur}
          />
        )}

        <AnimatedTextInputImages onPress={onMewTwoButtonPress} />
      </Box>
    </ContainerBoxForPlatform>
  );
}

function ContainerBoxForPlatform({ children }: PropsWithChildren) {
  if (Platform.OS === 'ios') {
    return <Box zIndex={1}>{children}</Box>;
  }
  return <>{children}</>;
}
