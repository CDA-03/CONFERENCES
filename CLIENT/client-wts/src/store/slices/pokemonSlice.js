// pokemonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemon: null,
    isHeavy: false, 
    error: null,
    weight : null,
    isLoading : true
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemon: (state, action) => {
            state.pokemon = action.payload
            state.isHeavy = action.payload.weight > 100
            state.weight = action.payload.weight
            state.isLoading = false
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setPokemon, setError } = pokemonSlice.actions;

export default pokemonSlice.reducer;
