import React from 'react';
import { PokeWrapper } from './components/wrappers/PokeWrapper';
import { useSelector } from 'react-redux';

const App = () => {
    const { pokemon, isHeavy, weight, error, isLoading } = useSelector(state => state.pokemon)

    console.log(pokemon, isHeavy, error, weight)

    return (
        <PokeWrapper pokemonName="ditto">
            {(isHeavy) ?
                <h1>Is Heavy</h1> : (
                    <>
                        {isLoading ? <p>is loading ...</p> : (
                            <>
                                <h1>{pokemon.name}</h1>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <p>Poids : {pokemon.weight}</p>
                                <p>Hauteur : {pokemon.height}</p>
                            </>
                        )}
                    </>
                )
            }
        </PokeWrapper>
    );
};

export default App;
