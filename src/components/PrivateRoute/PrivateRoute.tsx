import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import getUserTokenData from "../../auth/userTokenData";

const PrivateRoutes: React.FC = () => {
  return <>{!getUserTokenData() ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
