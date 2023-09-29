import React from 'react';
import { Image } from 'react-native';

// import star from '../../assets/tabBarImages/star.png';
import starOutline from '../../assets/tabBarImages/starOutline.png';
import { TouchableOpacityBox } from '../Box/Box';

export function FavoriteButton() {
  return (
    <TouchableOpacityBox onPress={() => console.log('TODO')}>
      <Image source={starOutline} style={{ height: 35, width: 35 }} />
    </TouchableOpacityBox>
  );
}
