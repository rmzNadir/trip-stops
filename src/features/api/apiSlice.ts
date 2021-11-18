import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetPlacesParams,
  Place,
  SearchTripsBody,
  TripDetailsRequestParams,
  TripDetailsSearch,
  TripsInfo,
  TripsSearch,
  GetTripDetailsParams,
  TripDetails,
} from '../../types';

const API_BASE_URL = 'https://api.etn.com.mx/api/v2/';
const API_TOKEN = 'Token token=021c51a3e0cb47968610f9e1dcdc71d0';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      if (API_TOKEN) {
        headers.set('authorization', API_TOKEN);
      }

      return headers;
    },
  }),
  tagTypes: ['Places', 'Trips', 'TripDetails'],
  endpoints: (builder) => ({
    // QUERIES
    getPlaces: builder.query<Place[], GetPlacesParams>({
      query: (params) => {
        return {
          url: 'places',
          params,
        };
      },
      // Currently unused but may come in handy later.
      providesTags: [{ type: 'Places', id: 'LIST' }],
    }),
    getTrips: builder.query<TripsInfo, number>({
      query: (id) => `search/${id}?type=bus`,
      providesTags: (_result, _error, _arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    getTripDetails: builder.query<TripDetails, GetTripDetailsParams>({
      query: ({ trip_id, details_request_id }) =>
        `/trips/${trip_id}/details_requests/${details_request_id}`,
      providesTags: (_result, _error, _arg) => [
        { type: 'TripDetails', id: 'LIST' },
      ],
    }),
    // MUTATIONS
    searchTrips: builder.mutation<TripsSearch, SearchTripsBody>({
      query: (body) => ({
        url: 'search',
        method: 'POST',
        body: { ...body, passengers: ['adult'], way: 'departure' },
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'Trips', id: 'LIST' },
      ],
    }),
    searchTripDetails: builder.mutation<
      TripDetailsSearch,
      TripDetailsRequestParams
    >({
      query: (trip_id) => ({
        url: `trips/${trip_id}/details_requests`,
        method: 'POST',
        body: {
          with_pricing: false,
          include: ['path'],
        },
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'TripDetails', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useGetTripsQuery,
  useSearchTripsMutation,
  useLazyGetTripsQuery,
  usePrefetch,
  useSearchTripDetailsMutation,
  useLazyGetTripDetailsQuery,
} = apiSlice;
