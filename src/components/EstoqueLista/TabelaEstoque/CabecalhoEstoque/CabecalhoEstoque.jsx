
import React from "react";
import "./CabecalhoEstoque.css";

const CabecalhoEstoque = () => {
  return (
    <thead className="cabecalho-estoque-prod">
      <tr>
        <th>Cód.</th>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Compra</th>
        <th>Venda</th>
        <th>Estoque</th>
        <th>Registro</th>
        <th>Descrição</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};

export default CabecalhoEstoque;
