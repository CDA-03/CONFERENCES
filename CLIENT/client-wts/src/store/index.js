import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

import pokemonReducer from './slices/pokemonSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    pokemon : pokemonReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

