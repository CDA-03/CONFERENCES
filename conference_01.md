### Titre de la conférence :  

**Introduction : "Simplifier les Requêtes API avec RTK Query et `createApi` : Le Pouvoir de la Gestion de Données dans React"**  

**Présentée par Antoine Lucsko**

---

### Description de la conférence :  

RTK Query, un outil puissant de la suite Redux Toolkit, transforme la gestion des requêtes API dans les applications React. Grâce à **`createApi`**, il est désormais possible de simplifier et d'automatiser le processus de gestion des données côté client, réduisant ainsi le code nécessaire pour interagir avec les API. Cette conférence, animée par **Antoine Lucsko**, vous guidera à travers les concepts clés de RTK Query, l'intégration de **`createApi`**, et vous montrera comment il peut simplifier la gestion des appels API, tout en offrant une meilleure performance et maintenabilité.

### Plan de la conférence :

1. **Introduction à RTK Query** 
   - Pourquoi RTK Query ? Les défis des requêtes API dans React.
   - Vue d'ensemble de RTK Query et de son fonctionnement avec Redux Toolkit.
   - La simplicité des actions automatiques avec **`createApi`** 

2. **L'API `createApi`**  :brain:
   - Créer un service API avec **`createApi`**.
   - Définir les endpoints : GET, POST, PUT, DELETE, etc.
   - Utilisation des **tags** et de la mise à jour automatique du cache.

3. **Gestion de l'état et des erreurs**  
   - Comment RTK Query gère l'état de chargement, le succès, et les erreurs de manière intuitive.
   - Utilisation de **`useGetQuery`**, **`useMutation`**, et gestion des réponses dans le store Redux.

4. **Optimisation des performances**  
   - Le caching avec **`cacheTime`** et la gestion des requêtes en arrière-plan.

5. **Cas d'utilisation et exemples pratiques**  
   - Intégration avec des API publiques (ex: Pokémon API).

6. **Best Practices**  
   - Bonnes pratiques pour structurer vos services avec **`createApi`**.
   - Quand et pourquoi utiliser **`useQuery`** et **`useMutation`**.

### Objectifs de la conférence :

- **Comprendre les avantages de RTK Query** pour simplifier la gestion des données dans une application React.
- **Apprendre à configurer et utiliser `createApi`** pour automatiser la gestion des appels API.
- **Mieux organiser les appels API** dans des projets React complexes tout en réduisant le code redondant et en simplifiant la maintenance.

## Création de l'API

  ```javascript
   export const apiSlice = createApi({
       reducerPath: 'api',
       baseQuery: fetchBaseQuery({
           baseUrl: URL_API,
           prepareHeaders: (headers) => {
               return headers
           }
       }),
       tagTypes : ['Pokemon'],
       endpoints : () => ({})
   })
   ```

1. **Import des modules nécessaires** :
   ```javascript
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
   ```
   - `createApi` : Cette fonction de Redux Toolkit Query permet de configurer et de créer une "API slice" qui gère les appels API, le caching et l'invalidation des données.
   - `fetchBaseQuery` : C'est une fonction qui facilite la création des requêtes de base. Elle gère les requêtes HTTP en utilisant `fetch` et permet de configurer l'URL de base pour tous les appels API.

2. **Définition de l'URL de l'API** :
   ```javascript
   const URL_API = 'https://pokeapi.co/api/v2/pokemon/'
   ```
   - `URL_API` : Cette constante contient l'URL de base de l'API Pokémon. Elle est utilisée pour construire les requêtes vers les endpoints de cette API.

3. **Création de l'API Slice avec `createApi`** :
 
   Cette partie crée l'API slice nommée `apiSlice`. Voici les détails de chaque option passée à `createApi` :

   - **`reducerPath`** :
     ```javascript
     reducerPath: 'api',
     ```
     - `reducerPath` : Ce nom (`'api'`) est utilisé pour référencer cette API dans le store Redux. Cela permet à Redux de savoir où stocker l'état de cette API dans le store global.

   - **`baseQuery`** :
     ```javascript
     baseQuery: fetchBaseQuery({
         baseUrl: URL_API,
         prepareHeaders: (headers) => {
             return headers
         }
     })
     ```
     - `baseQuery` : Définit la configuration des requêtes API.
       - `baseUrl` : Spécifie l'URL de base pour toutes les requêtes (ici, `URL_API`).
       - `prepareHeaders` : Cette fonction est exécutée avant chaque requête pour préparer les en-têtes (`headers`) envoyés au serveur. Dans ce code, elle est vide, mais on pourrait y ajouter des en-têtes d'autorisation (comme un jeton JWT) ou d'autres informations.

   - **`tagTypes`** :
     ```javascript
     tagTypes : ['Pokemon'],
     ```
     - `tagTypes` : Définit les étiquettes (ou tags) pour marquer les données mises en cache. Ici, le tag `'Pokemon'` est utilisé. Il permet de suivre les données associées aux Pokémon pour invalider le cache lorsqu'il y a des changements dans ces données (par exemple, une mise à jour ou une suppression). Cette approche permet d'optimiser les re-renders et d'assurer que les composants affichent des données à jour.

   - **`endpoints`** :
     ```javascript
     endpoints : () => ({})
     ```
     - `endpoints` : Un objet ou une fonction retournant un objet qui définira les endpoints de l'API, c'est-à-dire les différentes opérations (comme `getPokemon`, `addPokemon`, `updatePokemon`) que cette API pourra effectuer. Ici, les endpoints sont laissés vides (`{}`), ce qui signifie qu’ils seront définis dans des fichiers séparés pour une meilleure organisation.


---

### Code avec `configureStore`

```javascript
import { configureStore } from '@reduxjs/toolkit' 
import pokemonSlice from './slices/pokemonSlice'
import { apiSlice } from '../api/apiSlice'

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
```

---

### 1. Importation des modules

```javascript
import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './slices/pokemonSlice'
import { apiSlice } from '../api/apiSlice'
```

- **`configureStore`** : Une fonction de `@reduxjs/toolkit` qui simplifie la création d'un store Redux en combinant les reducers, le middleware, et d'autres paramètres par défaut.
- **`pokemonSlice`** : Ce fichier contient un slice Redux, qui gère une partie de l'état spécifique aux données Pokémon.
- **`apiSlice`** : Ce module contient la configuration de l'API (gérée avec RTK Query) et inclut ses reducers et middlewares nécessaires pour les requêtes API.

---

### 2. Configuration du store

```javascript
export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
```

- **`reducer`** : Définit les reducers pour le store, qui gèrent les différentes parties de l'état global de l'application.

    - **`pokemon: pokemonSlice.reducer`** : Ce reducer gère les données spécifiques aux Pokémon dans l'état. Ce nom `pokemon` permet d’accéder à cette partie de l’état dans les composants.

    - **`[apiSlice.reducerPath]: apiSlice.reducer`** : Ajoute le reducer géré par RTK Query, spécifiquement pour les requêtes API définies dans `apiSlice`. Le `reducerPath` est une propriété de `apiSlice` qui permet de nommer automatiquement ce reducer.

- **`middleware`** : Permet de spécifier des middlewares supplémentaires pour gérer des actions asynchrones ou des effets de bord.
    - **`getDefaultMiddleware()`** : Fonction qui fournit les middlewares par défaut pour Redux Toolkit, comme `redux-thunk` pour les actions asynchrones.
    - **`.concat(apiSlice.middleware)`** : Ajoute le middleware de `apiSlice`, nécessaire pour que RTK Query puisse gérer les requêtes, les mises à jour du cache, et d'autres opérations liées aux données API.

---

### Résumé de la configuration du store

Ce store Redux est configuré pour :

1. **Gérer l'état global** des données Pokémon via `pokemonSlice`.
2. **Gérer les données API** avec `apiSlice`, permettant d'accéder aux requêtes API dans les composants et de gérer le cache automatiquement.
3. **Ajouter des middlewares** pour les requêtes API avec RTK Query, assurant une gestion centralisée et réactive des données dans l'application. 
