import React from "react";
import SignUp from "../components/SignUp";
import SingIn from "../components/SingIn";
import PokemonsPage from "../components/PokemonsPage";
import NotFound from "../components/NotFound";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoute";
import PublicRoutes from "../components/PublicRoute";
import SinglePokemonPage from "../components/SinglePokemonPage";
import PokemonComparisonPage from "../components/PokemonComparisonPage";
import IndexPage from "../components/IndexPage";

const Routing: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/login" element={<SingIn />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/page/:id" element={<PokemonsPage />} />
          <Route path="/pokemon/:id" element={<SinglePokemonPage />} />
          <Route path="/comparison" element={<PokemonComparisonPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Routing;
