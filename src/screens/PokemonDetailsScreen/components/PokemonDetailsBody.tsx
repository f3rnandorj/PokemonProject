import React from 'react';
import { Platform } from 'react-native';

import { Box, BoxProps, Icon, IconName, Text, TextProps } from '@components';
import { Pokemon } from '@domain';
import { useAppTheme } from '@hooks';

type PokemonBodyDetails = Pick<Pokemon, 'height' | 'weight' | 'principalMove'>;

interface PokemonBodyDetailsCardProps {
  isLast?: boolean;
  iconName?: IconName;
  description: string;
  info: string;
}

export function PokemonDetailsBody({
  height,
  weight,
  principalMove,
}: PokemonBodyDetails) {
  return (
    <Box {...$wrapperComponent}>
      <PokemonBodyDetailsCard
        iconName="weightIcon"
        info={`${String(weight)} kg`}
        description="Peso"
      />

      <PokemonBodyDetailsCard
        iconName="ruleIcon"
        info={`${String(height)} m`}
        description="Altura"
      />

      <PokemonBodyDetailsCard
        info={principalMove}
        description="Poder Principal"
        isLast
      />
    </Box>
  );
}

function PokemonBodyDetailsCard({
  isLast = false,
  iconName,
  description,
  info,
}: PokemonBodyDetailsCardProps) {
  const { spacing } = useAppTheme();

  return (
    <Box {...$wrapperCard} borderRightWidth={!isLast ? spacing.s2 : 0}>
      <Box flexDirection="row" alignItems="center">
        {iconName && <Icon name={iconName} color="secondary" />}
        <Text preset="paragraphSmall" bold pl={'s8'}>
          {info}
        </Text>
      </Box>

      <Text {...$textCard} pl={isLast ? 's8' : 's2'}>
        {description}
      </Text>
    </Box>
  );
}

const $wrapperComponent: BoxProps = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginHorizontal: 's8',
  mt: Platform.OS === 'android' ? 's32' : 'ns12',
};

const $wrapperCard: BoxProps = {
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center',
  borderColor: 'backgroundContrastLight',
};

const $textCard: TextProps = {
  preset: 'paragraphCaptionSmall',
  mt: 's6',
  textAlign: 'center',
  color: 'secondary',
};
