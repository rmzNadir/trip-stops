import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import DepartDate from '../features/bookings/DepartDate';
import SearchDestinations from '../features/bookings/SearchDestinations';
import SearchOrigins from '../features/bookings/SearchOrigins';
import TripDetails from '../features/bookings/TripDetails';
import TripsList from '../features/bookings/TripsList';
import { RootStackParamList } from '../types';

const Root = createStackNavigator<RootStackParamList>();

const { Navigator, Screen } = Root;

const SearchTrips = () => {
  const navigatorOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: false,
    gestureEnabled: true,
  };

  return (
    <Navigator
      screenOptions={navigatorOptions}
      initialRouteName='SearchOrigins'>
      <Screen name='SearchOrigins' component={SearchOrigins} />
      <Screen name='SearchDestinations' component={SearchDestinations} />
      <Screen name='DepartDate' component={DepartDate} />
      <Screen name='TripsList' component={TripsList} />
      <Screen name='TripDetails' component={TripDetails} />
    </Navigator>
  );
};

export default SearchTrips;
