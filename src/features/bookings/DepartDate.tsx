import React from 'react';
import { Box, Heading, Text } from 'native-base';
import { DepartDateScreenProps } from '../../types';

const DepartDate = ({ navigation, route }: DepartDateScreenProps) => {
  return (
    <Box
      flex='1'
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}
      px='4'
      pb='4'>
      <Heading color='primary.500' size='xl'>
        When do you want to leave?
      </Heading>
      <Text>{JSON.stringify(route.params, null, 2)}</Text>
    </Box>
  );
};

export default DepartDate;
