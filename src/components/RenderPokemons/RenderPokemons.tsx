import * as React from "react";
import { useEffect, useState } from "react";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_POKEMONS } from "../../queries";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import MUITable from "../MUITable";
import { PokemonsData } from "../../types";
import { Column } from "../../types";

const RenderPokemons: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(Number(id) > 1 ? Number(id) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const gqlVariables = {
    offset: Number((page + 1) * rowsPerPage - rowsPerPage),
    limit: rowsPerPage,
  };

  const { data, refetch, isFetching } = useGQLQuery<PokemonsData>(
    ["pokemons"],
    GET_POKEMONS,
    gqlVariables
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    console.log(newPage);

    const segments = location.pathname.split("/");
    const baseSegments = segments.slice(0, segments.indexOf("pokemons") + 1);
    const base = baseSegments.join("/");
    navigate(`${base}/page/${newPage + 1}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    navigate("/pokemons");
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);

  const handleChangeSelectedItems = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedItems((prev) => {
        const updatedSelectedItems = [...prev, id];
        handleLocalStorage("pokeApiSelectedItems", updatedSelectedItems);
        return updatedSelectedItems;
      });
    } else {
      setSelectedItems((prev) => {
        const updatedSelectedItems = prev.filter((item) => item !== id);
        handleLocalStorage("pokeApiSelectedItems", updatedSelectedItems);
        return updatedSelectedItems;
      });
    }
  };
  const handleLocalStorage = (name: string, data: number[]) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
  const columns: readonly Column[] = [
    { id: "checkbox", label: "" },
    { id: "id", label: "Id" },
    { id: "name", label: "Name" },
    { id: "height", label: "Height", align: "right" },
    { id: "experience", label: "Experience", align: "right" },
    { id: "default", label: "Default", align: "right" },
    { id: "image", label: "Image", align: "center" },
  ];
  return (
    <MUITable
      columns={columns}
      data={data}
      page={page}
      id={id}
      rowsPerPage={rowsPerPage}
      isFetching={isFetching}
      showPagination={true}
      renderCheckbox={true}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeSelectedItems={handleChangeSelectedItems}
    />
  );
};

export default RenderPokemons;
