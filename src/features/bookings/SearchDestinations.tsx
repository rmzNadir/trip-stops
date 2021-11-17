import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Icon,
  useColorModeValue,
  useTheme,
  VStack,
  FlatList,
} from 'native-base';
import {
  Keyboard,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDebounce } from '../../app/useDebounce';
import { SearchDestinationsScreenProps } from '../../types';
import { Place } from '../../types';
import { useGetPlacesQuery } from '../api/apiSlice';
import PlaceCard from './PlaceCard';

interface ListHeaderComponentProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const ListHeaderComponent = ({
  search,
  setSearch,
}: ListHeaderComponentProps) => {
  return (
    <VStack
      space='2'
      pt='2'
      pb='4'
      px='4'
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}>
      <Heading color='primary.500' size='xl' mb='6'>
        What is your destination?
      </Heading>

      <InputGroup borderRightRadius={!search ? '4' : undefined} height='12'>
        <Input
          flex='1'
          placeholder='Search destinations'
          onChangeText={(v) => setSearch(v)}
          value={search}
        />
        <InputRightAddon
          p='0'
          borderWidth={!search ? '0' : '1'}
          borderColor='muted.500'
          children={
            !search ? null : (
              <IconButton
                disabled={!search}
                borderRadius='0'
                _icon={{
                  color: 'white',
                }}
                icon={<Icon as={Entypo} name='cross' />}
                onPress={() => setSearch('')}
              />
            )
          }
        />
      </InputGroup>
    </VStack>
  );
};

const SearchDestinations = ({
  navigation,
  route,
}: SearchDestinationsScreenProps) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 250);
  const {
    data: places,
    refetch,
    isFetching,
  } = useGetPlacesQuery({
    q: search ? (debouncedSearch as string) : undefined,
    from: route.params.origin,
  });

  const keyExtractor = useCallback((place: Place) => place.id.toString(), []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Place>) => (
      <Pressable
        onPress={() =>
          navigation.navigate('DepartDate', {
            origin: route.params.origin,
            destination: info.item.slug,
          })
        }>
        <PlaceCard {...info} />
      </Pressable>
    ),
    [navigation, route],
  );

  const ItemSeparatorComponent = useCallback(() => <Box height='2' />, []);

  const ListFooterComponent = useCallback(() => <Box height='6' />, []);

  return (
    <Box flex='1' _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }}>
      <FlatList
        keyboardShouldPersistTaps='handled'
        ListHeaderComponent={
          <ListHeaderComponent search={search} setSearch={setSearch} />
        }
        refreshControl={
          <RefreshControl
            colors={[colors.primary[400], colors.primary[500]]}
            progressBackgroundColor={useColorModeValue(
              colors.muted[50],
              colors.muted[800],
            )}
            refreshing={isFetching}
            onRefresh={() => refetch()}
          />
        }
        stickyHeaderIndices={[0]}
        removeClippedSubviews
        onScrollBeginDrag={Keyboard.dismiss}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={places}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </Box>
  );
};

export default SearchDestinations;
