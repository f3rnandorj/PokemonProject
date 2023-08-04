import React from 'react';

import { PokemonDetails } from '@domain';

import { Box, BoxProps, Icon, Text } from '@components';

interface CharacteristicCardProps {
  label: string;
  count?: number;
  mascInfo?: number;
  femInfo?: number;
}

type Props = Pick<
  PokemonDetails['characteristics'],
  | 'gender'
  | 'atkSpeed'
  | 'attack'
  | 'defSpeed'
  | 'defense'
  | 'health'
  | 'speed'
  | 'total'
>;

export function PokemonCharacteristicsDetails(details: Props) {
  return (
    <>
      <Box paddingVertical="s32">
        <Text preset="headerCaptionMedium" semiBold mb="s16">
          Suas características
        </Text>

        <CharacteristicCard
          label="Gênero"
          mascInfo={details.gender.masc}
          femInfo={details.gender.fem}
        />
        <CharacteristicCard label="Saúde" count={details.health} />
        <CharacteristicCard label="Ataque" count={details.attack} />
        <CharacteristicCard label="Defesa" count={details.defense} />
        <CharacteristicCard label="Vl. Ataque" count={details.atkSpeed} />
        <CharacteristicCard label="Vl. Defesa" count={details.defSpeed} />
        <CharacteristicCard label="Velocidade" count={details.speed} />
        <CharacteristicCard label="Total" count={details.total} />
      </Box>
    </>
  );
}

function CharacteristicCard({
  label,
  femInfo,
  count,
  mascInfo,
}: CharacteristicCardProps) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s8">
      <Box width={'25%'}>
        <Text preset="paragraphLarge" medium>
          {label}
        </Text>
      </Box>

      {femInfo && mascInfo && (
        <Box {...$mascAndFemWrapper}>
          <Box mr="s16" {...$mascAndFem}>
            <Icon name="mascIcon" color="mascIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s6">
              {mascInfo}%
            </Text>
          </Box>

          <Box ml="s16" {...$mascAndFem}>
            <Icon name="femIcon" color="femIcon" width={20} height={20} />
            <Text preset="paragraphMediumDescription" bold pl="s2">
              {femInfo}%
            </Text>
          </Box>
        </Box>
      )}

      {count && (
        <>
          <Box width={'10%'}>
            <Text medium>{count}</Text>
          </Box>

          <Box width={'65%'}>
            <Box
              alignSelf="center"
              width={'90%'}
              height={4}
              borderRadius="s24"
              bg="grayBar"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

const $mascAndFemWrapper: BoxProps = {
  width: '75%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const $mascAndFem: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
