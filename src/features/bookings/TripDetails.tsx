import React from 'react';
import { Box, Text, Heading, VStack } from 'native-base';
import { Pressable } from 'react-native';
import ToggleDarkMode from '../../components/ToggleDarkMode';
import { TripDetailsScreenProps } from '../../types';

const TripDetails = ({ navigation }: TripDetailsScreenProps) => {
  return (
    <Box flex={1} _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }}>
      <Heading color='primary.500' size='xl'>
        TripDetails
      </Heading>

      <VStack mt='2' space='2' alignItems='center'>
        <ToggleDarkMode />
        <Pressable onPress={() => navigation.navigate('SearchOrigins')}>
          <Text
            underline
            _dark={{ color: 'muted.200' }}
            _light={{
              color: 'muted.600',
            }}>
            Search
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default TripDetails;
