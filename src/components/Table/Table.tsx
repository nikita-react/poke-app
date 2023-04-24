import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_POKEMONS } from "../../queries";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { log } from "console";

interface Column {
  id: "id" | "name" | "height" | "experience" | "default" | "image";
  label: string;
  align?: "right" | "center";
}
const columns: readonly Column[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "height", label: "Height", align: "right" },
  { id: "experience", label: "Experience", align: "right" },
  { id: "default", label: "Default", align: "right" },
  { id: "image", label: "Image", align: "center" },
];
interface Pokemon {
  id: number;
  name: string;
  height: number;
  base_experience: number;
  is_default: boolean;
}

interface Data {
  pokemon_v2_pokemon: Pokemon[];
  pokemon_v2_pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

const StickyHeadTable: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(Number(id) > 1 ? Number(id) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const gqlVariables = {
    offset: Number((page + 1) * rowsPerPage - rowsPerPage),
    limit: rowsPerPage,
  };

  const { data, refetch } = useGQLQuery<Data>(
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
    <Paper
      className="container mx-auto"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align={column.align} key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.pokemon_v2_pokemon.map((pokemon: Pokemon) => {
                const isDefault = pokemon.is_default ? "Yes" : "No";
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={pokemon.id}
                  >
                    <TableCell>{pokemon.id}</TableCell>
                    <TableCell>{pokemon.name}</TableCell>
                    <TableCell className="!text-right">
                      {pokemon.height}
                    </TableCell>
                    <TableCell className="!text-right">
                      {pokemon.base_experience}
                    </TableCell>
                    <TableCell className="!text-right">{isDefault}</TableCell>
                    <TableCell>
                      <img
                        className="mx-auto"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={
          data
            ? data.pokemon_v2_pokemon_aggregate.aggregate.count
            : id
            ? rowsPerPage * (page + 1)
            : rowsPerPage
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
