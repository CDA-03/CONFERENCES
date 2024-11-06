import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setPokemon } from "../../store/slices/pokemonSlice";
import { useGetPokemonByNameQuery } from "../../api/endpoints/pokemon";

export const PokeWrapper = ({ pokemonName, children }) => {
    const { data, error, isSuccess, isFetching } = useGetPokemonByNameQuery(pokemonName);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(setError("error ???"));

        } else if (isSuccess && data) {
            console.log("w", data.weight)
            if (data.weight > 100)
                dispatch(setError('is heavy'))
            else 
                dispatch(setPokemon(data))
        }
    }, [error, data, isSuccess, dispatch]);

    if (isFetching)
        return <p>Chargement en cours ...</p>;

    return <>{children}</>;
};