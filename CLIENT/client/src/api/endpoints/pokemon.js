import { apiSlice } from '../apiSlice'

apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // on crée un point d'entrée dans l'API que l'on nomme getPokemonByName, avec paramètre
        // le builder.query fera le fetch pour récupérer les données
        getPokemonByName : builder.query({
            query: (name) => `/${name}`
        })
    }), 
    invalidatesTags: ['Pokemon'] // la clé pour invalider le cache ( refresh de la page )
})

// on export la fonction qui va nous permettre de récupérer les données de l'api dans les composants, c'est une convention de nommage use + GetPokemonByName + Query (CamelCase)
export const { useGetPokemonByNameQuery } = apiSlice

