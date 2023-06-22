import { useState, useEffect } from "react";

const useSelectedPokemons = (): [number[], (id: number) => void] => {
  const [selectedItemsIdArray, setSelectedItemsIdArray] = useState<number[]>(
    JSON.parse(localStorage.getItem("pokeApiSelectedItems") || "[]")
  );

  const deleteSelectedPokemon = (id: number): void => {
    const data: number[] = JSON.parse(
      localStorage.getItem("pokeApiSelectedItems") || "[]"
    );
    const updatedSelectedItems: number[] = data.filter((item: number) => item !== id);
    localStorage.setItem(
      "pokeApiSelectedItems",
      JSON.stringify(updatedSelectedItems)
    );

    setSelectedItemsIdArray(updatedSelectedItems);
  };

  useEffect(() => {
    localStorage.setItem(
      "pokeApiSelectedItems",
      JSON.stringify(selectedItemsIdArray)
    );
  }, [selectedItemsIdArray]);

  return [selectedItemsIdArray, deleteSelectedPokemon];
};

export default useSelectedPokemons;
