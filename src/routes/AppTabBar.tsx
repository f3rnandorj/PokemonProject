import React from 'react';
import { Image } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Box, Text, TouchableOpacityBox } from '@components';
import { useAppTheme } from '@hooks';

import { AppTabBottomParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useAppTheme();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const tabItem =
          mapScreenToProps[route.name as keyof AppTabBottomParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacityBox
            key={index}
            flex={1}
            activeOpacity={1}
            justifyContent="center"
            alignItems="center"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              route.name !== 'HomeScreen'
                ? { backgroundColor: colors.backgroundHeader }
                : { flexDirection: 'row' }
            }>
            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1,
                      backgroundColor: colors.backgroundHeader,
                      height: '100%',
                      borderTopRightRadius: 100,
                    }
                  : null,
              ]}
            />

            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1.5,
                      backgroundColor: colors.backgroundHeader,
                    }
                  : null,
              ]}
            />

            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1,
                      backgroundColor: colors.backgroundHeader,
                      height: '100%',
                      borderTopLeftRadius: 100,
                    }
                  : null,
              ]}
            />

            <Image
              source={isFocused ? tabItem.icon.focused : tabItem.icon.unFocused}
              style={[
                { height: 35, width: 35, marginTop: 4 },
                route.name === 'HomeScreen'
                  ? {
                      height: isFocused ? 85 : 65,
                      width: isFocused ? 85 : 65,
                      position: 'absolute',
                      bottom: 16,
                      zIndex: 1,
                    }
                  : null,
              ]}
              resizeMode="contain"
            />

            <Box
              style={
                route.name === 'HomeScreen'
                  ? {
                      backgroundColor: colors.backgroundHeader,
                      position: 'absolute',
                      top: 25,
                      paddingTop: 15,
                    }
                  : null
              }>
              <Text
                preset="tab"
                color="background"
                marginVertical="s2"
                paddingHorizontal="s16"
                semiBold>
                {tabItem.label}
              </Text>
            </Box>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}
