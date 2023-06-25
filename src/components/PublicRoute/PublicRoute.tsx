import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PublicRoutes: React.FC = () => {
  const sessionQuery = useQuery<boolean>(['session']);

  return <div >{!sessionQuery.data ? <Outlet /> : <Navigate to="/pokemons" />}</div>;
};

export default PublicRoutes;
