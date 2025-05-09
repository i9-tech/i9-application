import React from "react";
import "./CabecalhoPratos.css";

const CabecalhoPratos = () => {
  return (
    <thead className="cabecalho-estoque">
      <tr>
        <th>Cód.</th>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Categoria</th>
        <th>Status</th>
        <th>Registro</th>
        <th>Descrição</th>
      </tr>
    </thead>
  );
};

export default CabecalhoPratos;
