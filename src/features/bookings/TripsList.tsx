import React, { useEffect, useState } from 'react';
import { Box, Heading } from 'native-base';
import { TripsListsScreenProps } from '../../types';
import { useLazyGetTripsQuery, useSearchTripsMutation } from '../api/apiSlice';

const TripsList = ({ navigation, route }: TripsListsScreenProps) => {
  const [searchTrips, { data: searchInfo }] = useSearchTripsMutation();
  const [interval, setInterval] = useState(0);
  const [getTrips, { data: tripsInfo }] = useLazyGetTripsQuery({
    pollingInterval: interval,
  });

  useEffect(() => {
    searchTrips(route.params);
  }, [searchTrips, route.params]);

  useEffect(() => {
    // Refetch every 1s unless tripsInfo query is finished
    if (searchInfo) {
      !interval && setInterval(1000);
      if (tripsInfo && tripsInfo.state === 'finished') {
        setInterval(0);
      } else {
        getTrips(searchInfo?.search.id);
      }
    }
  }, [getTrips, searchInfo, tripsInfo, interval]);

  return (
    <Box
      flex='1'
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}
      px='4'
      pt='2'
      pb='4'>
      <Heading color='primary.500' size='xl' mb='6'>
        Available trips
      </Heading>
      {JSON.stringify(tripsInfo, null, 2)}
    </Box>
  );
};

export default TripsList;
