import { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableData, Pokemon } from "../../types";
import { useNavigate } from "react-router-dom";

const MUITable: FC<TableData> = ({
  columns,
  data,
  page,
  rowsPerPage,
  id,
  navigateUrl,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const navigate = useNavigate();

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
                    <TableCell>
                      <span
                        className="cursor-pointer hover:underline "
                        onClick={() => navigate(`${navigateUrl}/${pokemon.id}`)}
                      >
                        {pokemon.name}
                      </span>
                    </TableCell>
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
                        alt={pokemon.name}
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

export default MUITable;
