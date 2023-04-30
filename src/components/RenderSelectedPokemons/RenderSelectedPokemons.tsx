import MUITable from "../MUITable";
import { Column } from "../../types";
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
  ];
  const selectedItemsId = localStorage.getItem("pokeApiSelectedItems") || "";
  const selectedItemsIdArray = JSON.parse(selectedItemsId);

  const { data, isLoading, isFetching } = useGQLQuery(
    ["selectedPokemons"],
    GET_SELECTED_POKEMONS,
    {
      _in: selectedItemsIdArray,
    }
  );

  return (
    <MUITable
      columns={columns}
      data={data}
      isFetching={isFetching}
      showPagination={false}
      renderCheckbox={false}
    />
  );
};
export default RenderSelectedPokemons;
