import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import getUserTokenData from "../../auth/userTokenData";

const PublicRoutes: React.FC = () => {
  return <>{getUserTokenData() ? <Outlet /> : <Navigate to="/" />};</>;
};

export default PublicRoutes;
