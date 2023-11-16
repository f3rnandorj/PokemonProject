import React from 'react';
import { Image } from 'react-native';

import searchScreen from '../../assets/brand/articuno.png';
import homeScreen from '../../assets/brand/moltres.png';
import favoriteScreen from '../../assets/brand/zapdos.png';
import { Box, BoxProps } from '../Box/Box';

interface Props extends BoxProps {
  screen: ImageProps;
}

export function ImageBackGround({
  screen,
  children,
  style,
  ...boxProps
}: Props) {
  return (
    <Box
      testID="image-background"
      height={'100%'}
      opacity={0.6}
      position="absolute"
      top={-10}
      justifyContent="center"
      {...boxProps}
      style={[style]}>
      <Image
        source={images[screen]}
        style={{
          height: 400,
          width: 400,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      {children}
    </Box>
  );
}

type ImageProps = keyof typeof images;
const images = {
  searchScreen,
  homeScreen,
  favoriteScreen,
};
