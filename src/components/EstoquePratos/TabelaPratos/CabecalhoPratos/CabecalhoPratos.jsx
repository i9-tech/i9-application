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
        <th>Disponibilidade</th>
        <th>Setor</th>
        <th>Categoria</th>
        <th>Área</th>
        <th>Descrição</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};

export default CabecalhoPratos;
