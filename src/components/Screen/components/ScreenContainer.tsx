import React from 'react';
import { ScrollView, View } from 'react-native';

import Animated from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
}

export function ViewContainer({ children, backgroundColor }: Props) {
  return <View style={{ flex: 1, backgroundColor }}>{children}</View>;
}

function ScrollViewContainer({ children, backgroundColor }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor }}
      nestedScrollEnabled={true}>
      {children}
    </ScrollView>
  );
}

function ScrollViewAnimatedContainer({ children, backgroundColor }: Props) {
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor }}>
      {children}
    </Animated.ScrollView>
  );
}

export const scrollWrapper = {
  animated: ScrollViewAnimatedContainer,
  normal: ScrollViewContainer,
};
