import * as React from "react";
import { useEffect, useState } from "react";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_POKEMONS } from "../../queries";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import MUITable from "../Table";
import { PokemonsData, Column } from "../../types";

const columns: readonly Column[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "height", label: "Height", align: "right" },
  { id: "experience", label: "Experience", align: "right" },
  { id: "default", label: "Default", align: "right" },
  { id: "image", label: "Image", align: "center" },
];

const RenderPokemons: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(Number(id) > 1 ? Number(id) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const gqlVariables = {
    offset: Number((page + 1) * rowsPerPage - rowsPerPage),
    limit: rowsPerPage,
  };

  const { data, refetch } = useGQLQuery<PokemonsData>(
    ["pokemons"],
    GET_POKEMONS,
    gqlVariables
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    const segments = location.pathname.split("/");
    const baseSegments = segments.slice(0, segments.indexOf("page") + 1);
    const base = baseSegments.join("/");

    navigate(`${base}/${newPage}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);
  return (
    <MUITable
      columns={columns}
      data={data}
      page={page}
      id={id}
      rowsPerPage={rowsPerPage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
    />
  );
};

export default RenderPokemons;
