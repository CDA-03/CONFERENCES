import { apiSlice } from "../apiSlice"

apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getPokemonByName: builder.query({
        query: (name) => `/${name}`,
      }),
    }),
    invalidatesTags: ['Pokemon'],
  });
  
  export const { useGetPokemonByNameQuery } = apiSlice
  