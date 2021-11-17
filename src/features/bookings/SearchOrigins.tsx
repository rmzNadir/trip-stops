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
  HStack,
} from 'native-base';
import {
  Keyboard,
  ListRenderItemInfo,
  RefreshControl,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDebounce } from '../../app/useDebounce';
import { SearchOriginsScreenProps } from '../../types';
import { Place } from '../../types';
import { useGetPlacesQuery } from '../api/apiSlice';
import PlaceCard from './PlaceCard';

interface ListHeaderComponentProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  navigation: SearchOriginsScreenProps['navigation'];
}

const ListHeaderComponent = ({
  search,
  setSearch,
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
            Where are you leaving from?
          </Heading>
        </Box>
      </HStack>

      <InputGroup borderRightRadius={!search ? '4' : undefined} height='12'>
        <Input
          flex='1'
          placeholder='Search origins'
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

const ItemSeparatorComponent = () => <Box height='3' />;

const ListFooterComponent = () => <Box height='6' />;

const SearchOrigins = ({ navigation }: SearchOriginsScreenProps) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 250) as string;
  const {
    data: places,
    refetch,
    isFetching,
  } = useGetPlacesQuery({
    q: search ? debouncedSearch : undefined,
  });

  const keyExtractor = useCallback((place: Place) => place.id.toString(), []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Place>) => (
      <Pressable
        onPress={() =>
          navigation.navigate('SearchDestinations', { origin: info.item.slug })
        }>
        <PlaceCard {...info} />
      </Pressable>
    ),
    [navigation],
  );

  return (
    <Box flex='1' _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }}>
      <FlatList
        keyboardShouldPersistTaps='handled'
        ListHeaderComponent={
          <ListHeaderComponent
            search={search}
            setSearch={setSearch}
            navigation={navigation}
          />
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

export default SearchOrigins;
