/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface SearchDestinationProps {
  origin: string;
}

export interface DepartDateProps extends SearchDestinationProps {
  destination: string;
}

export interface TripListsProps extends DepartDateProps {
  date: string;
}

export type RootStackParamList = {
  TripDetails: undefined;
  SearchOrigins: undefined;
  SearchDestinations: SearchDestinationProps;
  DepartDate: DepartDateProps;
  TripsList: TripListsProps;
};

export type TripDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TripDetails'
>;

export type SearchOriginsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchOrigins'
>;

export type SearchDestinationsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchDestinations'
>;

export type DepartDateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DepartDate'
>;

export type TripsListsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TripsList'
>;
