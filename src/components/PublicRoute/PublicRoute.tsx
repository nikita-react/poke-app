import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SessionContext } from "../../context";

const PublicRoutes: React.FC = () => {
  const session = useContext(SessionContext);

  return <>{session === null ? <Outlet /> : <Navigate to="/" />};</>;
};

export default PublicRoutes;
