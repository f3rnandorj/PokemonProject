import React, { useState } from 'react';
import { Image, Platform } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Box, Text, TouchableOpacityBox } from '@components';
import { useAppTheme, useAppSafeArea } from '@hooks';

import { AppTabBottomParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

const IMG_POSITION_IOS = 36;

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [barHeight, setBarHeight] = useState(0);
  const { colors } = useAppTheme();
  const { bottom } = useAppSafeArea();

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
            onLayout={e => setBarHeight(e.nativeEvent.layout.height)}
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
            style={[
              { paddingBottom: bottom },
              route.name !== 'HomeScreen'
                ? { backgroundColor: colors.primary }
                : { flexDirection: 'row' },
            ]}>
            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1,
                      backgroundColor: colors.primary,
                      borderTopRightRadius: 100,
                      height:
                        Platform.OS === 'ios' && bottom > 0
                          ? barHeight + bottom + 2
                          : '100%',
                      marginBottom:
                        Platform.OS === 'ios' && bottom > 0
                          ? -bottom - IMG_POSITION_IOS
                          : 0,
                    }
                  : null,
              ]}
            />

            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1.5,
                      backgroundColor: colors.primary,
                      height:
                        Platform.OS === 'ios' && bottom > 0
                          ? barHeight + bottom + 2
                          : 0,
                      marginBottom:
                        Platform.OS === 'ios' && bottom > 0
                          ? -bottom - IMG_POSITION_IOS
                          : 0,
                    }
                  : null,
              ]}
            />

            <Box
              style={[
                route.name === 'HomeScreen'
                  ? {
                      flex: 1,
                      backgroundColor: colors.primary,
                      borderTopLeftRadius: 100,
                      height:
                        Platform.OS === 'ios' && bottom > 0
                          ? barHeight + bottom + 2
                          : '100%',
                      marginBottom:
                        Platform.OS === 'ios' && bottom > 0
                          ? -bottom - IMG_POSITION_IOS
                          : 0,
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
                      bottom: bottom + 16,
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
                      backgroundColor: colors.primary,
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
