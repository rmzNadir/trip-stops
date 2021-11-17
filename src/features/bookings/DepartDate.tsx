import React, { useState, useRef, useEffect, useMemo } from 'react';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Box, Button, Heading, Input, VStack } from 'native-base';
import { TextInput } from 'react-native';
import { DepartDateScreenProps } from '../../types';
import { usePrefetch, useSearchTripsMutation } from '../api/apiSlice';

const DepartDate = ({ navigation, route }: DepartDateScreenProps) => {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [searchTrips, { data: searchInfo }] = useSearchTripsMutation();
  const prefetchTrips = usePrefetch('getTrips');

  const SearchParams = useMemo(
    () => ({
      ...route.params,
      date: format(date, 'dd-MM-yyyy'),
    }),
    [date, route.params],
  );

  useEffect(() => {
    //Get trips search info
    searchTrips(SearchParams);
  }, [SearchParams, searchTrips]);

  useEffect(() => {
    //Prefetch trips info
    if (searchInfo) {
      prefetchTrips(searchInfo.search.id, { force: true });
    }
  }, [searchInfo, prefetchTrips]);

  const onChange = (_: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setVisible(false);
  };

  const onInputFocus = () => {
    setVisible(true);
    inputRef.current?.blur();
  };

  return (
    <Box
      flex='1'
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}
      px='4'
      pt='2'
      pb='4'>
      <VStack space='2'>
        <Heading color='primary.500' size='xl' mb='6'>
          When do you want to leave?
        </Heading>
        <Input
          ref={inputRef}
          value={format(date, 'eeee, MMMM dd yyyy')}
          placeholder='Enter departure date'
          showSoftInputOnFocus={false}
          onFocus={onInputFocus}
        />
        <Button onPress={() => navigation.navigate('TripsList', SearchParams)}>
          Search trips
        </Button>
      </VStack>
      {visible && <DateTimePicker value={date} onChange={onChange} />}
    </Box>
  );
};

export default DepartDate;
