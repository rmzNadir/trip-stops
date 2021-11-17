import React from 'react';
import { Box, Text, Heading, VStack, HStack, IconButton } from 'native-base';
import { Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToggleDarkMode from '../../components/ToggleDarkMode';
import { TripDetailsScreenProps } from '../../types';

const TripDetails = ({ navigation }: TripDetailsScreenProps) => {
  const canGoback = navigation.canGoBack();

  return (
    <Box
      flex={1}
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}
      p='4'
      justifyContent='space-between'>
      <HStack space='2' justifyContent='space-between' alignItems='center'>
        {canGoback && (
          <Box>
            <IconButton
              onPress={() => navigation.goBack()}
              variant='solid'
              size='sm'
              _icon={{
                as: AntDesign,
                name: 'arrowleft',
              }}
            />
          </Box>
        )}
        <Box flex='1' alignItems={canGoback ? 'center' : 'flex-start'}>
          <Heading color='primary.500' size='lg'>
            Trip details
          </Heading>
        </Box>
      </HStack>

      <VStack mt='6' space='2' alignItems='center'>
        <ToggleDarkMode />
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'SearchOrigins' }],
            })
          }>
          <Text
            underline
            _dark={{ color: 'muted.200' }}
            _light={{
              color: 'muted.600',
            }}>
            Back to start
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default TripDetails;
