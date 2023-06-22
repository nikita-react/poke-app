import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PrivateRoutes: React.FC = () => {
  const sessionQuery = useQuery<boolean>(['session']);

  return <>{sessionQuery.data ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
