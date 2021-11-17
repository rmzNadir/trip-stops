import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorMode, useTheme } from 'native-base';
import { StatusBar, Platform } from 'react-native';
import DepartDate from '../features/bookings/DepartDate';
import SearchDestinations from '../features/bookings/SearchDestinations';
import SearchOrigins from '../features/bookings/SearchOrigins';
import TripDetails from '../features/bookings/TripDetails';
import TripsList from '../features/bookings/TripsList';
import { RootStackParamList } from '../types';

const Root = createNativeStackNavigator<RootStackParamList>();

const { Navigator, Screen } = Root;

const Routes = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(
        colorMode === 'dark' ? 'light-content' : 'dark-content',
      );
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(
          colorMode === 'dark' ? colors.muted[900] : colors.muted[50],
        );
    }, [colorMode, colors.muted]),
  );

  return (
    <Navigator
      initialRouteName='SearchOrigins'
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name='SearchOrigins' component={SearchOrigins} />
      <Screen name='SearchDestinations' component={SearchDestinations} />
      <Screen name='DepartDate' component={DepartDate} />
      <Screen name='TripsList' component={TripsList} />
      <Screen name='TripDetails' component={TripDetails} />
    </Navigator>
  );
};

export default Routes;
