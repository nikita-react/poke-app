import { ComparisonPagePokemonData } from "../types";
import { useGQLQuery } from "./useGQLQuery";
import { GET_SELECTED_POKEMONS } from "../queries";


 const useSelectedPokemonsQuery = (selectedItemsIdArray: number[]) => {
    const { data, isFetching, refetch } = useGQLQuery<ComparisonPagePokemonData>(
        ["selectedPokemons"],
        GET_SELECTED_POKEMONS,
        {
          _in: selectedItemsIdArray,
        }
      );
  return { data, isFetching, refetch };
};
export default useSelectedPokemonsQuery