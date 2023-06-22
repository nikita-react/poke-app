import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PublicRoutes: React.FC = () => {
  const sessionQuery = useQuery<boolean>(['session']);

  return <>{!sessionQuery.data ? <Outlet /> : <Navigate to="/pokemons" />}</>;
};

export default PublicRoutes;
