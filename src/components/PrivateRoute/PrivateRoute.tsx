import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SessionContext } from "../../context";

const PrivateRoutes: React.FC = () => {
  const session = useContext(SessionContext);
  return <>{session ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
