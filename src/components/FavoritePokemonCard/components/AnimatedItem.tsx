import React from 'react';
import { Image } from 'react-native';

import Animated, { RollInLeft } from 'react-native-reanimated';

interface Props {
  pokemonRarity: number;
}

export function AnimatedItem({ pokemonRarity }: Props) {
  return (
    <Animated.View entering={RollInLeft.duration(1000)} style={{}}>
      <Image
        source={pokemonRarity}
        style={{ height: 35, width: 35 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}
