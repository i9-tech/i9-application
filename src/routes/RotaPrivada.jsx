import React from "react";
import { Navigate } from "react-router-dom";
import { getFuncionario } from "../utils/auth";

export default function RotaPrivada({ children, permissao }) {
  const funcionario = getFuncionario();

  if (!funcionario) {
    return <Navigate to="/login" />;
  }

  if (!funcionario[permissao]) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
