import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPlacesParams, Place } from '../../types';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.etn.com.mx/api/' }),
  tagTypes: ['Places'],
  endpoints: (builder) => ({
    getPlaces: builder.query<Place[], GetPlacesParams>({
      query: (params) => {
        return {
          url: 'v2/places',
          params,
        };
      },
      providesTags: [{ type: 'Places', id: 'LIST' }],
    }),
  }),
});

export const { useGetPlacesQuery } = apiSlice;
