import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useTextInputDropBox() {
  const [isDropDownOpen, setIsDropDown] = useState(false);
  const [width, setWidth] = useState(0);
  const [positionY, setPositionY] = useState(0);

  function onLayoutInput(event: LayoutChangeEvent) {
    const height = event.nativeEvent.layout.height;

    setWidth(event.nativeEvent.layout.width);
    setPositionY(event.nativeEvent.layout.y + height);
  }

  function setIsDropDownOpen(value: boolean) {
    setIsDropDown(value);
  }

  return {
    onLayoutInput,
    setIsDropDownOpen,
    width,
    positionY,
    isDropDownOpen,
  };
}
