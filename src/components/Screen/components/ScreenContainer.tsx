import React from 'react';
import { ScrollView, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
}

export function ViewContainer({ children, backgroundColor }: Props) {
  return <View style={{ flex: 1, backgroundColor }}>{children}</View>;
}

export function ScrollViewContainer({ children, backgroundColor }: Props) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>{children}</ScrollView>
  );
}
