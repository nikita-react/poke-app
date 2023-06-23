import * as React from "react";
import { useEffect, useState } from "react";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_POKEMONS } from "../../queries";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import MUITable from "../MUIComponents/MUITable";
import { PokemonsData } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { RenderPokemonsColumns } from '../../constants';
import PokemonPageWrapper from "../PokemonPageWrapper";

const PokemonsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(Number(id) > 1 ? Number(id) - 1 : 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>(
    JSON.parse(localStorage.getItem("pokeApiSelectedItems") || "[]")
  );

  const { data: searchData } = useQuery(['searchData'], () => {
    return ''
  });


  const gqlVariables = {
    offset: Number((page + 1) * rowsPerPage - rowsPerPage),
    limit: rowsPerPage,
    query: searchData ?? ''
  };

  const { data, refetch, isFetching } = useGQLQuery<PokemonsData>(
    ["pokemons"],
    GET_POKEMONS,
    gqlVariables
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
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
    setPage(Number(id) > 1 ? Number(id) - 1 : 0)
  }, [page, rowsPerPage, searchData, id]);

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



  return (
    <PokemonPageWrapper search={true}>
      <MUITable
        columns={RenderPokemonsColumns}
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
        selectedItems={selectedItems}
        renderDeleteButton={false}
      />
    </PokemonPageWrapper>
  );
};

export default PokemonsPage;
