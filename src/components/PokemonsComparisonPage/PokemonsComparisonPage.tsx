import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIDialog from "../MUIComponents/MUIDialog";
import MUITable from "../MUIComponents/MUITable";
import {
  SortKey,
} from "../../types";
import { keysToCompare, RenderSelectedPokemonsColumns } from "../../constants";
import usePokemonSort from "../../hooks/usePokemonSort";
import useSelectedPokemonsQuery from "../../hooks/useSelectedPokemonsQuery";
import useSelectedPokemons from "../../hooks/useSelectedPokemons";
import PokemonPageWrapper from "../PokemonPageWrapper";

const PokemonsComparisonPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortKey>("Default");
  const [selectedItemsIdArray, deleteSelectedPokemon] = useSelectedPokemons();
  const { data, isFetching } = useSelectedPokemonsQuery(selectedItemsIdArray);
  const sortedData = usePokemonSort(
    data,
    selectedValue
  );

  const handleSortOpen = () => {
    setOpen(true);
  };

  const handleSortClose = (value: SortKey) => {
    setOpen(false);
    setSelectedValue(value);
  };


  return (
    <PokemonPageWrapper search={false}>
      {selectedItemsIdArray.length ? (
        <div className="container flex flex-col items-start gap-4 mx-auto">
          <Typography variant="subtitle1" component="div">
            {selectedValue && ` Sort by ${selectedValue}`}
          </Typography>
          <Button variant="contained" color="success" onClick={handleSortOpen}>
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
            columns={RenderSelectedPokemonsColumns}
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
    </PokemonPageWrapper>
  );
};
export default PokemonsComparisonPage;
