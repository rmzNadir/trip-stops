import React, { useEffect, useMemo, useState } from 'react';
import { parseISO } from 'date-fns';
import format from 'date-fns/format';
import {
  Box,
  Heading,
  VStack,
  HStack,
  IconButton,
  useTheme,
  useColorModeValue,
  Icon,
  Text,
  Spinner,
} from 'native-base';
import { RefreshControl, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TripDetailsScreenProps } from '../../types';
import {
  useLazyGetTripDetailsQuery,
  useSearchTripDetailsMutation,
} from '../api/apiSlice';

const TripDetails = ({ navigation, route }: TripDetailsScreenProps) => {
  const canGoback = navigation.canGoBack();
  const { colors } = useTheme();
  const [searchTripsDetails, { data: searchInfo }] =
    useSearchTripDetailsMutation();
  const [interval, setInterval] = useState(0);
  const [getTripDetails, { data: tripDetails }] = useLazyGetTripDetailsQuery({
    pollingInterval: interval,
  });

  useEffect(() => {
    searchTripsDetails(route.params.trip_id);
  }, [searchTripsDetails, route.params.trip_id]);

  useEffect(() => {
    // Refetch every 1s unless tripDetails query is finished
    if (searchInfo) {
      !interval && setInterval(1000);
      if (tripDetails && tripDetails.state === 'finished') {
        setInterval(0);
      } else {
        getTripDetails({
          trip_id: route.params.trip_id,
          details_request_id: searchInfo.id,
        });
      }
    }
  }, [getTripDetails, searchInfo, tripDetails, interval, route.params.trip_id]);

  const pathData = useMemo(() => {
    if (tripDetails && tripDetails.trip?.path?.length) {
      const path = tripDetails.trip.path[0];

      const result = [
        {
          time: format(parseISO(path.departure), 'h:mm a'),
          title: path.origin,
          description: 'Departure from origin',
        },
      ];

      for (const stopover of path.stops) {
        const arrival = {
          time: format(parseISO(stopover.arrival), 'h:mm a'),
          title: stopover.terminal,
          description: 'Stopover arrival',
        };
        const departure = {
          time: format(parseISO(stopover.departure), 'h:mm a'),
          title: stopover.terminal,
          description: 'Stopover departure',
        };

        result.push(arrival);
        result.push(departure);
      }

      result.push({
        time: format(parseISO(path.arrival), 'h:mm a'),
        title: path.destination,
        description: 'Arrival to destination',
      });

      return result;
    }

    return [];
  }, [tripDetails]);

  return (
    <Box flex={1} _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }} p='4'>
      <VStack space='6' flex='1'>
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
          <Box>
            <IconButton
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'SearchOrigins' }],
                })
              }
              variant='solid'
              size='sm'
              _icon={{
                as: AntDesign,
                name: 'home',
              }}
            />
          </Box>
        </HStack>

        {/* This info doesn't seem to come from the api? */}
        <HStack space='2' justifyContent='space-around'>
          <VStack space='1' alignItems='center'>
            <Icon as={FontAwesome5} name='restroom' minW='8' size='sm' />
            <Text>Restroom</Text>
          </VStack>
          <VStack space='1' alignItems='center'>
            <Icon as={FontAwesome5} name='tv' minW='8' size='sm' />
            <Text>Entertainment</Text>
          </VStack>
          <VStack space='1' alignItems='center'>
            <Icon as={FontAwesome5} name='ticket-alt' minW='8' size='sm' />
            <Text>E-Tickets</Text>
          </VStack>
        </HStack>

        {tripDetails?.state !== 'finished' && (
          <Spinner accessibilityLabel='Loading itinerary' size='lg' />
        )}

        <Timeline
          // options={{
          //   refreshControl: (
          //     <RefreshControl
          //       colors={[colors.primary[400], colors.primary[500]]}
          //       progressBackgroundColor={useColorModeValue(
          //         colors.muted[50],
          //         colors.muted[800],
          //       )}
          //       refreshing={tripDetails?.state !== 'finished'}
          //       onRefresh={() =>
          //         searchInfo?.id &&
          //         getTripDetails({
          //           trip_id: route.params.trip_id,
          //           details_request_id: searchInfo.id,
          //         })
          //       }
          //     />
          //   ),
          // }}
          circleColor={colors.primary[300]}
          lineColor={colors.primary[500]}
          innerCircle='dot'
          detailContainerStyle={[
            styles.detailContainer,
            {
              backgroundColor: useColorModeValue(
                colors.muted[50],
                colors.muted[700],
              ),
              borderColor: useColorModeValue(
                colors.muted[200],
                colors.muted[800],
              ),
            },
          ]}
          timeStyle={[
            styles.time,
            { color: colors.white, backgroundColor: colors.primary[500] },
          ]}
          titleStyle={{
            color: useColorModeValue(colors.darkText, colors.lightText),
          }}
          descriptionStyle={{
            color: useColorModeValue(colors.light[800], colors.light[200]),
          }}
          data={pathData}
          listViewContainerStyle={styles.timeline}
          columnFormat='two-column'
        />
      </VStack>
    </Box>
  );
};

export default TripDetails;

const borderRadius = 10;

const styles = StyleSheet.create({
  timeline: { paddingTop: 6 },

  time: {
    textAlign: 'center',
    padding: 5,
    borderRadius: borderRadius,
    fontWeight: 'bold',
  },
  detailContainer: {
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: borderRadius,
  },
});
