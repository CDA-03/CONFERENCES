import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            return headers
        },
    }),
    tagTypes: ['Pokemon'],
    endpoints: () => ({}),
});

