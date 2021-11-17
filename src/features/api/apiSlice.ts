import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetPlacesParams,
  Place,
  SearchTripsBody,
  TripsInfo,
  TripsSearch,
} from '../../types';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.etn.com.mx/api/v2/' }),
  tagTypes: ['Places', 'TripsSearch', 'Trips'],
  endpoints: (builder) => ({
    getPlaces: builder.query<Place[], GetPlacesParams>({
      query: (params) => {
        return {
          url: 'places',
          params,
        };
      },
      providesTags: [{ type: 'Places', id: 'LIST' }],
    }),
    getTrips: builder.query<TripsInfo, number>({
      query: (id) => `search/${id}?type=bus`,
      providesTags: [{ type: 'Trips', id: 'LIST' }],
    }),
    searchTrips: builder.mutation<TripsSearch, SearchTripsBody>({
      query: (body) => ({
        url: `search`,
        method: 'POST',
        body: { ...body, passengers: ['adult'], way: 'departure' },
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'TripsSearch', id: 'LIST' },
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
} = apiSlice;
