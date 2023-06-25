import {useGQLQuery} from "./useGQLQuery";
import {SinglePokemonData} from "../types";
import {GET_POKEMON} from "../queries";

 const usePokemonData = (id: any) => {
    const { data, isLoading } = useGQLQuery<SinglePokemonData>(
        ["pokemon"],
        GET_POKEMON,
        {
            id: id,
        }
    );

    const {
        pokemon_v2_pokemon,
        pokemon_v2_pokemonspeciesdescription,
        pokemon_v2_pokemonspeciesflavortext,
    } = data || {};

    const {
        id: pokemonId,
        name,
        height,
        base_experience,
        is_default,
    } = pokemon_v2_pokemon?.[0] || {};

    const { description } = pokemon_v2_pokemonspeciesdescription?.[0] || {};
    const { flavor_text } = pokemon_v2_pokemonspeciesflavortext?.[0] || {};

    return {
        pokemonId,
        name,
        height,
        base_experience,
        is_default,
        description,
        flavor_text,
        isLoading,
    }
};

export default usePokemonData