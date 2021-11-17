import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import {
  Keyboard,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Terminal, Trip, TripsListsScreenProps } from '../../types';
import { useLazyGetTripsQuery, useSearchTripsMutation } from '../api/apiSlice';
import TripCard from './TripCard';

interface ListHeaderComponentProps {
  terminals: Terminal[];
  navigation: TripsListsScreenProps['navigation'];
}

const ListHeaderComponent = ({
  terminals,
  navigation,
}: ListHeaderComponentProps) => {
  const canGoback = navigation.canGoBack();

  return (
    <VStack
      space='4'
      p='4'
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}>
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
            Available trips
          </Heading>
        </Box>
      </HStack>
      <Center>
        <Heading color='primary.500' size='md'>
          {!!terminals.length && `${terminals[0].name} - ${terminals[1].name}`}
        </Heading>
      </Center>
    </VStack>
  );
};

const ItemSeparatorComponent = () => <Box height='3' />;

const ListFooterComponent = () => <Box height='6' />;

const TripsList = ({ navigation, route }: TripsListsScreenProps) => {
  const { colors } = useTheme();
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

  const keyExtractor = useCallback((trip: Trip) => trip.id, []);

  const terminals = useMemo(
    () => Object.values(tripsInfo?.terminals || {}),
    [tripsInfo?.terminals],
  );

  const lines = useMemo(
    () => Object.values(tripsInfo?.lines || {}),
    [tripsInfo?.lines],
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Trip>) => (
      <Pressable onPress={() => navigation.navigate('TripDetails')}>
        <TripCard {...info} lines={lines} />
      </Pressable>
    ),
    [navigation, lines],
  );

  return (
    <Box flex='1' _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }}>
      <FlatList
        keyboardShouldPersistTaps='handled'
        ListHeaderComponent={
          <ListHeaderComponent terminals={terminals} navigation={navigation} />
        }
        refreshControl={
          <RefreshControl
            colors={[colors.primary[400], colors.primary[500]]}
            progressBackgroundColor={useColorModeValue(
              colors.muted[50],
              colors.muted[800],
            )}
            refreshing={tripsInfo?.state !== 'finished'}
            onRefresh={() =>
              searchInfo?.search.id && getTrips(searchInfo?.search.id)
            }
          />
        }
        stickyHeaderIndices={[0]}
        removeClippedSubviews
        onScrollBeginDrag={Keyboard.dismiss}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={tripsInfo?.trips}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </Box>
  );
};

export default TripsList;
