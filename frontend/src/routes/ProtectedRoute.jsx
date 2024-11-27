import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { verificar_sesion } from "../services/auth";

const ProtectedRoute = () => {
  let islogged = localStorage.getItem("access");

  if (!islogged) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
