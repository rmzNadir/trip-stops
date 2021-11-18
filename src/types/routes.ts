/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

export type RootBottomTabsParams = {
  SearchTrips: SearchTripsScreenProps;
  Settings: undefined;
};

export type SearchTripsScreenProps = MaterialBottomTabScreenProps<
  RootBottomTabsParams,
  'SearchTrips'
>;

export interface SearchDestinationProps {
  origin: string;
}

export interface DepartDateProps extends SearchDestinationProps {
  destination: string;
}

export interface TripListsProps extends DepartDateProps {
  date: string;
}

export interface TripDetailsProps {
  trip_id: string;
}

export type RootStackParamList = {
  TripDetails: TripDetailsProps;
  SearchOrigins: undefined;
  SearchDestinations: SearchDestinationProps;
  DepartDate: DepartDateProps;
  TripsList: TripListsProps;
};

export type TripDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'TripDetails'
>;

export type SearchOriginsScreenProps = StackScreenProps<
  RootStackParamList,
  'SearchOrigins'
>;

export type SearchDestinationsScreenProps = StackScreenProps<
  RootStackParamList,
  'SearchDestinations'
>;

export type DepartDateScreenProps = StackScreenProps<
  RootStackParamList,
  'DepartDate'
>;

export type TripsListsScreenProps = StackScreenProps<
  RootStackParamList,
  'TripsList'
>;
