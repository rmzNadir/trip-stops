// import React, { useCallback } from 'react';
// import { useFocusEffect } from '@react-navigation/core';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { useColorMode, useTheme } from 'native-base';
// import { StatusBar, Platform } from 'react-native';
// import Settings from '../components/Settings';
// import { RootBottomTabsParams } from '../types';
// import SearchTrips from './SearchTrips';

// const Tab = createMaterialBottomTabNavigator<RootBottomTabsParams>();

// const { Navigator, Screen } = Tab;

// const Routes = () => {
//   const { colors } = useTheme();
//   const { colorMode } = useColorMode();

//   useFocusEffect(
//     useCallback(() => {
//       StatusBar.setBarStyle(
//         colorMode === 'dark' ? 'light-content' : 'dark-content',
//       );
//       Platform.OS === 'android' &&
//         StatusBar.setBackgroundColor(
//           colorMode === 'dark' ? colors.muted[900] : colors.muted[50],
//         );
//     }, [colorMode, colors.muted]),
//   );

//   return (
//     <Navigator
//       initialRouteName='SearchTrips'
//       barStyle={{ backgroundColor: colors.muted['800'] }}>
//       <Screen name='SearchTrips' component={SearchTrips} />
//       <Screen name='Settings' component={Settings} />
//     </Navigator>
//   );
// };

// export default Routes;

import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useColorModeValue } from 'native-base';
import { useColorMode, useTheme } from 'native-base';
import { StatusBar, Platform } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import DepartDate from '../features/bookings/DepartDate';
import SearchDestinations from '../features/bookings/SearchDestinations';
import SearchOrigins from '../features/bookings/SearchOrigins';
import TripDetails from '../features/bookings/TripDetails';
import TripsList from '../features/bookings/TripsList';
import { RootStackParamList } from '../types';

const Root = createStackNavigator<RootStackParamList>();

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

const SearchTrips = () => {
  return (
    <NavigationContainer theme={useColorModeValue(DefaultTheme, DarkTheme)}>
      <Routes />
    </NavigationContainer>
  );
};

export default SearchTrips;
