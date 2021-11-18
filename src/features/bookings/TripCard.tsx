import React, { memo } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Center,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { currencyFormatter } from '../../app/currencyFormatter';
import { Line, Trip } from '../../types';

interface TripCardProps {
  item: Trip;
  lines: Line[];
}

const TripCard = memo(({ item, lines }: TripCardProps) => {
  const {
    line_id,
    pricing: { total, total_before_discount },
    departure,
    arrival,
  } = item;

  const lineLogoUrl = lines.find((l) => l.abbr === line_id)?.logo_url || '';

  return (
    <Box
      rounded='lg'
      _dark={{ bg: 'muted.700', borderColor: 'muted.800' }}
      _light={{ bg: 'muted.50', borderColor: 'muted.200' }}
      borderWidth='1'
      overflow='hidden'
      mx='4'>
      <HStack>
        <Center bg='muted.50'>
          <Image
            size='lg'
            resizeMode='contain'
            source={{
              uri: lineLogoUrl,
            }}
            alt={`${line_id} line logo`}
          />
        </Center>
        <VStack px='4' p='2' space='2' flex='1'>
          <HStack space='2' alignItems='flex-end'>
            <Heading size='md'>{currencyFormatter(total)}</Heading>
            <Text
              fontSize='xs'
              strikeThrough
              mb='0.5'
              _dark={{ color: 'muted.300' }}
              _light={{ color: 'muted.500' }}>
              {currencyFormatter(total_before_discount)}
            </Text>
          </HStack>
          <HStack space='2' justifyContent='space-between'>
            <VStack space='1'>
              <Text color='primary.400'>Departure</Text>
              <Text>{format(new Date(departure), 'h:mm a')}</Text>
            </VStack>
            <Center>
              <Icon as={AntDesign} name='calendar' color='primary.500' />
            </Center>
            <VStack space='1'>
              <Text color='primary.400'>Arrival</Text>
              <Text>{format(new Date(arrival), 'h:mm a')}</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
});

export default TripCard;
