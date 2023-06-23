import { GET_POKEMONS } from "../queries";
import { PokemonsData } from "../types";
import { useGQLQuery } from "../hooks/useGQLQuery";

 const usePokemonsQuery = (page: number, rowsPerPage: number, searchData: string | undefined) => {
  const gqlVariables = {
    offset: Number((page + 1) * rowsPerPage - rowsPerPage),
    limit: rowsPerPage,
    query: searchData ?? ''
  };

  const { data, refetch, isFetching } = useGQLQuery<PokemonsData>(
    ["pokemons"],
    GET_POKEMONS,
    gqlVariables
  );

  return { data, refetch, isFetching };
};
export default usePokemonsQuery