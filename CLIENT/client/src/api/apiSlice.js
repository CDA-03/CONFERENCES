import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL_API = 'https://pokeapi.co/api/v2/pokemon/'

export const apiSlice = createApi({
    reducerPath: 'api', // il faut donner un nom a votre objet pour RTK
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API, 
        prepareHeaders: (headers) => {
            // logique lors de l'envoi de la requete vers le serveur API

            return headers
        }
    }),
    tagTypes : ['Pokemon'], // permet d'avoir une clé pour invalider le cache si les données changent un peu comme un re-render 
    endpoints : () => ({}), // on va les définir dans des fichiers séparer 
})