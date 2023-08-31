import React from 'react';
import { Image } from 'react-native';

import Animated, { RollInLeft } from 'react-native-reanimated';

import masterBall from '../../../assets/brandPokeballs/masterball.png';
import { TouchableOpacityBox } from '../../Box/Box';

interface Props {
  onPress: () => void;
}

export function AnimatedTextInputImages({ onPress }: Props) {
  return (
    <>
      <Animated.View
        entering={RollInLeft.duration(1000)}
        style={{ position: 'absolute', top: 7, left: -10 }}>
        <Image
          source={masterBall}
          style={{ height: 60 }}
          resizeMode="contain"
        />
      </Animated.View>

      <TouchableOpacityBox
        onPress={onPress}
        style={{ position: 'absolute', top: 0, right: 0 }}>
        <Image
          source={{
            uri: 'https://projectpokemon.org/images/normal-sprite/mewtwo.gif',
          }}
          style={{
            height: 65,
            width: 65,
          }}
          resizeMode="cover"
        />
      </TouchableOpacityBox>
    </>
  );
}
