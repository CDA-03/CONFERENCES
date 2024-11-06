import { createSlice  } from "@reduxjs/toolkit"

const initialState = {
    pokemon : "POKEMON",
    isHeavy : null
}

const pokemonSlice = createSlice({
    name : 'pokemon',
    initialState,
    reducers : {
        setPokemon: (state, action) => {
            state.pokemon = action.payload
            state.isHeavy = action.payload.weight > 100 
        }
    }
})

// permet de récupérer les reducers qui vont modifier le state initialState ici
export const { setPokemon } = pokemonSlice.actions

// permettra de lire les données dans les parties contextualisées 
export default pokemonSlice