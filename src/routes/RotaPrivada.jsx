import React from "react";
import { Navigate } from "react-router-dom";
import { getPermissoes } from "../utils/auth";

export default function RotaPrivada({ children, permissao }) {
  const permissoes = getPermissoes();

  console.log("Permissões disponíveis:", permissoes);
  console.log("Permissão requisitada:", permissao);

  if (permissoes.length === 0) {
    return <Navigate to="/login" />;
  }

  if (!permissoes.includes(permissao)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
