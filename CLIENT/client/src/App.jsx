
import { useGetPokemonByNameQuery } from './api/endpoints/pokemon'
import './App.css'

function App() {
  const { data, isLoading } = useGetPokemonByNameQuery('ditto')

  if (isLoading) return <p>is loading ...</p>

  return (
    <>
      <h1>Informations sur {data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Type(s) : {data.types.map((type) => type.type.name).join(', ')}</p>
      <p>Poids : {data.weight} hectogrammes</p>
      <p>Hauteur : {data.height} décimètres</p>
    </>
  )
}

export default App
