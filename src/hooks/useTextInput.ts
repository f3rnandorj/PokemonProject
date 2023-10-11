import { useState } from 'react';
import { Keyboard, TextInput } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { useToastService } from '@services';

type Props = {
  inputRef: React.RefObject<TextInput>;
  setIsDropDownOpen: (value: boolean) => void;
  value: string | undefined;
  isDropDownOpen: boolean;
};

export function useTextInput({
  inputRef,
  isDropDownOpen,
  setIsDropDownOpen,
  value,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { showToast } = useToastService();
  const { isConnected } = useNetInfo();

  function handleInputFocus() {
    setIsFocused(true);
    setIsDropDownOpen(true);
    inputRef?.current?.focus();
  }

  function handleInputBlur() {
    setIsDropDownOpen(false);
    setIsFocused(false);
    setIsFilled(!!value);
    Keyboard.dismiss();
  }

  function handleOnPressIcon() {
    isConnected
      ? isDropDownOpen
        ? handleInputBlur()
        : handleInputFocus()
      : showToast({
          message: 'Sem conexão com a internet!',
          type: 'error',
        });
  }

  return {
    isFocused,
    isFilled,
    handleInputFocus,
    handleInputBlur,
    handleOnPressIcon,
  };
}
