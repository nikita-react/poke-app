// hooks/customHooks.js
import { useState, useEffect } from "react";
import { Pokemon, SortKey, ComparisonPagePokemonData } from "../types";

 const usePokemonSort = (data: ComparisonPagePokemonData | undefined, selectedValue: SortKey) => {
    const sortPokemonData = (data: Pokemon[], selectedValue: SortKey) => {
        switch (selectedValue) {
          case "Height: High-Low":
            return data.sort((a, b) => b.height - a.height);
          case "Height: Low-High":
            return data.sort((a, b) => a.height - b.height);
          case "Experience: High-Low":
            return data.sort((a, b) => b.base_experience - a.base_experience);
          case "Experience: Low-High":
            return data.sort((a, b) => a.base_experience - b.base_experience);
          case "Default":
          default:
            return data.sort((a, b) => a.id - b.id);
        }
      };

      const [sortedData, setSortedData] = useState<
      ComparisonPagePokemonData | undefined
    >();

  useEffect(() => {
   if (data) {
      const sortedPokemonData = sortPokemonData(
        [...data.pokemon_v2_pokemon],
        selectedValue
      );
      setSortedData({ pokemon_v2_pokemon: sortedPokemonData });
    }
  }, [data, selectedValue]);

  return sortedData;
};




export default usePokemonSort