import React from "react";
import SignUp from "../components/Authentication/SignUp";
import SingIn from "../components/Authentication/SingIn";
import PokemonsPage from "../components/PokemonsPage"
import NotFound from "../components/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoute";
import PublicRoutes from "../components/PublicRoute";
import SinglePokemonPage from "../components/SinglePokemonPage";
import PokemonsComparisonPage from "../components/PokemonsComparisonPage";
import IndexPage from "../components/IndexPage";

const Routing: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route index element={<IndexPage />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/login" element={<SingIn />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/page/:id" element={<PokemonsPage />} />
          <Route path="/pokemon/:id" element={<SinglePokemonPage />} />
          <Route path="/comparison" element={<PokemonsComparisonPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Routing;
