/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface SearchDestinationProps {
  origin: string;
}

export interface DepartDateProps {
  origin: string;
  destination: string;
}

export type RootStackParamList = {
  TripDetails: undefined;
  SearchOrigins: undefined;
  SearchDestinations: SearchDestinationProps;
  DepartDate: DepartDateProps;
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
