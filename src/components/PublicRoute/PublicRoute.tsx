import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SessionContext } from "../../context";

const PublicRoutes: React.FC = () => {
  const session = useContext(SessionContext);

  return <>{!session ? <Outlet /> : <Navigate to="/pokemons" />}</>;
};

export default PublicRoutes;
