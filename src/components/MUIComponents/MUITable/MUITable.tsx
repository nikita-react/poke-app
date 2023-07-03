import { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableData, Pokemon } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles(() => ({
  skeleton: {
    margin: "0 auto",
    width: 96,
    height: 96,
    "@media (max-width: 780px)": {
      width: 40,
      height: 40,
    },
  },
}));

const MUITable: FC<TableData> = ({
  columns,
  data,
  page,
  rowsPerPage,
  id,
  handleChangeRowsPerPage,
  handleChangePage,
  isFetching,
  showPagination,
  handleChangeSelectedItems,
  renderCheckbox,
  selectedItems,
  renderDeleteButton,
  deleteSelectedPokemon,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const currentPage = page ?? 0;
  const currentRowsPerPage = rowsPerPage ?? 10;
  const currentSelectedItems = selectedItems ?? [];

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
            {data?.pokemon_v2_pokemon.map((pokemon: Pokemon) => {
              const isDefault = pokemon.is_default ? "Yes" : "No";
              const checkboxState = currentSelectedItems.some(
                (i) => i === pokemon.id
              );

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={pokemon.id}>
                  {renderCheckbox && (
                    <TableCell data-testid="checkbox">
                      <Checkbox
                        checked={checkboxState}
                        onChange={(event) =>
                          handleChangeSelectedItems &&
                          handleChangeSelectedItems(event, pokemon.id)
                        }
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    {isFetching ? (
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    ) : (
                      pokemon.id
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className="cursor-pointer hover:underline "
                      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                    >
                      {isFetching ? (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      ) : (
                        pokemon.name
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="!text-right">
                    {isFetching ? (
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    ) : (
                      pokemon.height
                    )}
                  </TableCell>
                  <TableCell className="!text-right">
                    {isFetching ? (
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    ) : (
                      pokemon.base_experience
                    )}
                  </TableCell>
                  <TableCell className="!text-right">
                    {" "}
                    {isFetching ? (
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    ) : (
                      isDefault
                    )}
                  </TableCell>
                  <TableCell>
                    {isFetching ? (
                      <Skeleton
                        variant="rectangular"
                        className={`${classes.skeleton} mx-auto`}
                      />
                    ) : (
                      <img
                        className="mx-auto"
                        alt={pokemon.name}
                        width={96}
                        height={96}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      />
                    )}
                  </TableCell>
                  {renderDeleteButton && (
                    <TableCell>
                      <Button
                      data-testid="delete-button"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          deleteSelectedPokemon &&
                          deleteSelectedPokemon(pokemon.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
        data-testid="table-pagination"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={
            data
              ? data.pokemon_v2_pokemon_aggregate.aggregate.count
              : id
                ? currentRowsPerPage * (currentPage + 1)
                : currentRowsPerPage
          }
          rowsPerPage={currentRowsPerPage}
          page={currentPage}
          onPageChange={(event, newPage) =>
            handleChangePage && handleChangePage(event, newPage)
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default MUITable;
