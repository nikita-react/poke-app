import React from "react";
import Registration from "../components/Registration";
import Login from "../components/Login";
import PokemonsPage from "../components/PokemonsPage";
import NotFound from "../components/NotFound";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoute";
import PublicRoutes from "../components/PublicRoute";
import SinglePokemon from "../components/SinglePokemon";

const Routing: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/page/:id" element={<PokemonsPage />} />
          <Route path="/pokemon/:id" element={<SinglePokemon />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Routing;
