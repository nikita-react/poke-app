import React from "react";
import Registration from "../components/Registration";
import Login from "../components/Login";
import PokemonsPage from "../components/PokemonsPage";
import NotFound from "../components/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoute";
import PublicRoutes from "../components/PublicRoute";

const Routing: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/pokemons" element={<PrivateRoutes />}>
          <Route index element={<PokemonsPage />} />
          <Route path="page/:id" element={<PokemonsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Routing;
