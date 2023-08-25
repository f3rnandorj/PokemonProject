import React from 'react';
import { Image, ImageBackground, ImageStyle, StyleProp } from 'react-native';

import { Box, BoxProps, Text } from '@components';
import { useAppSafeArea } from '@hooks';
import { useAppTheme } from '@hooks';

import pokeball from '../../assets/brand/pokeball.png';

interface Props {
  title: string;
  subTitle: string;
}

export function Header({ title, subTitle }: Props) {
  const { top } = useAppSafeArea();
  const { colors, borderRadii, spacing } = useAppTheme();

  return (
    <Box {...$wrapper} style={{ marginTop: -top }}>
      <Box {...$box}>
        <Box justifyContent="center" mt="s40">
          <Text preset="headerSmall" semiBold color="background">
            {title}
          </Text>

          <Text preset="headerCaptionMedium" color="background">
            {subTitle}
          </Text>
        </Box>

        <Box justifyContent="flex-end" mr="ns30">
          <ImageBackground
            source={pokeball}
            resizeMode="contain"
            style={{
              height: 150,
              width: 150,
            }}>
            <Image
              source={{
                uri: 'https://www.vhv.rs/dpng/d/250-2500140_death-clipart-died-ash-ketchum-hd-png-download.png',
              }}
              style={[
                $image,
                {
                  borderColor: colors.background,
                  borderRadius: borderRadii.s14,
                  borderWidth: spacing.s2,
                },
              ]}
            />
          </ImageBackground>
        </Box>
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  height: 165,
  bg: 'backgroundHeader',
  marginHorizontal: 'ns26',
  borderBottomLeftRadius: 's24',
  borderBottomRightRadius: 's24',
};

const $box: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 's26',
  height: '100%',
};

const $image: StyleProp<ImageStyle> = {
  height: 50,
  width: 50,
  position: 'absolute',
  bottom: 45,
  left: 60,
};