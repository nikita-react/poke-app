import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIDialog from "../MUIDialog";
import MUITable from "../MUITable";
import {
  Column,
  ComparisonPagePokemonData,
  Pokemon,
  SortKey,
} from "../../types";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_SELECTED_POKEMONS } from "../../queries";

const RenderSelectedPokemons = () => {
  const columns: readonly Column[] = [
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "height", label: "Height", align: "right" },
    { id: "experience", label: "Experience", align: "right" },
    { id: "default", label: "Default", align: "right" },
    { id: "image", label: "Image", align: "center" },
    { id: "delete", label: "" },
  ];

  const keysToCompare = [
    { key: "Default", name: "Default" },
    { key: "Height: High-Low", name: "Height: High-Low" },
    { key: "Height: Low-High", name: "Height: Low-High" },
    { key: "Experience: High-Low", name: "Experience: High-Low" },
    { key: "Experience: Low-High", name: "Experience: Low-High" },
  ];

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortKey>("Default");
  const [sortedData, setSortedData] = useState<
    ComparisonPagePokemonData | undefined
  >();
  const [selectedItemsIdArray, setSelectedItemsIdArray] = useState(
    JSON.parse(localStorage.getItem("pokeApiSelectedItems") || "[]")
  );
  const { data, isFetching, refetch } = useGQLQuery<ComparisonPagePokemonData>(
    ["selectedPokemons"],
    GET_SELECTED_POKEMONS,
    {
      _in: selectedItemsIdArray,
    }
  );

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

  useEffect(() => {
    if (data) {
      const sortedPokemonData = sortPokemonData(
        [...data.pokemon_v2_pokemon],
        selectedValue
      );
      setSortedData({ pokemon_v2_pokemon: sortedPokemonData });
    }
    refetch();
  }, [data, selectedValue, selectedItemsIdArray]);

  const handleSortClick = () => {
    setOpen(true);
  };

  const handleSortClose = (value: SortKey) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const deleteSelectedPokemon = (id: number) => {
    const data = JSON.parse(
      localStorage.getItem("pokeApiSelectedItems") || "[]"
    );

    const updatedSelectedItems = data.filter((item: number) => item !== id);

    localStorage.setItem(
      "pokeApiSelectedItems",
      JSON.stringify(updatedSelectedItems)
    );

    setSelectedItemsIdArray(updatedSelectedItems);
  };

  return (
    <>
      {selectedItemsIdArray.length ? (
        <div className="container flex flex-col items-start gap-4 mx-auto">
          <Typography variant="subtitle1" component="div">
            {selectedValue && ` Sort by ${selectedValue}`}
          </Typography>
          <Button variant="contained" color="success" onClick={handleSortClick}>
            Sort by
          </Button>

          <MUIDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleSortClose}
            setSortKey={setSelectedValue}
            data={keysToCompare}
          />
          <MUITable
            columns={columns}
            data={sortedData}
            isFetching={isFetching}
            showPagination={false}
            renderCheckbox={false}
            renderDeleteButton={true}
            deleteSelectedPokemon={deleteSelectedPokemon}
          />
        </div>
      ) : (
        <div className="container mx-auto">
          You haven't selected any Pokémon
        </div>
      )}
    </>
  );
};
export default RenderSelectedPokemons;
