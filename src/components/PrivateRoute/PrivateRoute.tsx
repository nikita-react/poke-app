import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import getUserTokenData from "../../auth/userTokenData";
import supabase from "../../client";

const PrivateRoutes: React.FC = () => {
  const navigate = useNavigate();

  const getSessionRequest = async () => {
    const userTokenData = JSON.parse(localStorage.getItem("PokeApp") || "");
    const { access_token } = userTokenData;
    const {
      data: { user },
    } = await supabase.auth.getUser(access_token);

    if (!user) {
      localStorage.removeItem("PokeApp");
      navigate("/login");
    }
  };

  useEffect(() => {
    getSessionRequest();
  }, []);

  return <>{!getUserTokenData() ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
