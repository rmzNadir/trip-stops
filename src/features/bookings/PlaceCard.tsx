import React, { memo } from 'react';
import { Box, Flex, Heading, HStack, Icon, VStack, Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Place } from '../../types';

interface PlaceCardProps {
  item: Place;
}

const PlaceCard = memo(({ item }: PlaceCardProps) => {
  const { display, state, city_name } = item;

  return (
    <Box
      rounded='lg'
      _dark={{ bg: 'muted.700', borderColor: 'muted.800' }}
      _light={{ bg: 'muted.50', borderColor: 'muted.200' }}
      overflow='hidden'
      borderWidth='1'
      mx='4'>
      <HStack space='2' alignItems='center' justifyContent='space-between'>
        <VStack space='2' p='4'>
          <Heading size='md'>{display}</Heading>

          <Flex
            flexDirection='row'
            justifyContent='space-between'
            alignItems='flex-end'>
            <VStack space='1'>
              <HStack space='2' alignItems='center'>
                <Icon
                  as={FontAwesome5}
                  name='map-marked-alt'
                  size='xs'
                  color='primary.500'
                />
                <Text
                  _dark={{ color: 'muted.200' }}
                  _light={{ color: 'muted.600' }}>
                  {state}
                </Text>
              </HStack>
              <HStack space='2' alignItems='center'>
                <Icon
                  as={FontAwesome5}
                  name='city'
                  size='xs'
                  color='primary.500'
                />
                <Text
                  _dark={{ color: 'muted.200' }}
                  _light={{ color: 'muted.600' }}>
                  {city_name}
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </VStack>
        <Box
          h='full'
          flexDir='row'
          alignItems='center'
          background='primary.500'
          px='2'>
          <Icon
            as={FontAwesome5}
            name='chevron-right'
            textAlign='center'
            borderLeftRadius='0'
            color='white'
          />
        </Box>
      </HStack>
    </Box>
  );
});

export default PlaceCard;
