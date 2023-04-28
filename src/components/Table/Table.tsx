import { FC, useState } from "react";
import "./styles.scss";
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
import { Skeleton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: "0 auto",
    width: 96,
    height: 96,
    [theme.breakpoints.down("sm")]: {
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
  navigateUrl,
  handleChangeRowsPerPage,
  handleChangePage,
  isFetching,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = useState<{ id: number }[]>([]);
  const handleChangeSelectedItems = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedItems((prev) => {
        const updatedSelectedItems = [...prev, { id: id }];
        handleLocalStorage("pokeApiSelectedItems", updatedSelectedItems);
        return updatedSelectedItems;
      });
    } else {
      setSelectedItems((prev) => {
        const updatedSelectedItems = prev.filter((item) => item.id !== id);
        handleLocalStorage("pokeApiSelectedItems", updatedSelectedItems);
        return updatedSelectedItems;
      });
    }
  };
  const handleLocalStorage = (name: string, data: { id: number }[]) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
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
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={pokemon.id}>
                  <TableCell>
                    <Checkbox
                      onChange={(event) =>
                        handleChangeSelectedItems(event, pokemon.id)
                      }
                    />
                  </TableCell>
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
                      onClick={() => navigate(`${navigateUrl}/${pokemon.id}`)}
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
