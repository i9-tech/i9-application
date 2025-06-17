import React from "react";
import "./CabecalhoFuncionarios.css";

const CabecalhoFuncionarios = () => {
  return (
    <thead className="cabecalho-funcionarios">
      <tr>
        <th>Nome</th>
        <th>Acessos</th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};

export default CabecalhoFuncionarios;
