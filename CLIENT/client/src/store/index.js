import { configureStore } from '@reduxjs/toolkit' // 
import pokemonSlice from './slices/pokemonSlice'
import { apiSlice } from '../api/apiSlice'

// récupérer api 
// récupérer les slices 

export const store = configureStore({
    reducer: {
        // donne accès au données dans les composants
        pokemon: pokemonSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    // permet de faire des traitements avant et après la requête pour createApi c'est obligatoire
    // middleware utile pour createSlice on peut définir de code métier avant et après les modification du state
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})