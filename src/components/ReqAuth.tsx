import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const { useState, useEffect } = React;

const RequireAuth = () => {
  console.log("ReqAuth")
  const location = useLocation();
  const { authState } = useAuth();

  return (authState.authenticated == true) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default RequireAuth;
