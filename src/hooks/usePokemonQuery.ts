import { useGQLQuery } from "../hooks/useGQLQuery";
import { GET_POKEMON } from "../queries";
import { SinglePokemonData } from "../types";


const usePokemonQuery = (id:any) => {
  const { data, isLoading } = useGQLQuery<SinglePokemonData>(
    ["pokemon"],
    GET_POKEMON,
    {
      id: id,
    }
  );
  return { data, isLoading };
};

export default usePokemonQuery;
