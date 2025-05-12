import React from "react";
import "./ProdutoEstoque.css";

const ProdutoEstoque = ({ produto, onEdit, onDelete }) => {
  return (
    <tr className="linha-produto-prod">
      <td>{produto.id}</td>
      <td>
        <div className="imagem-container-prod">
          <img src={produto.imagem} alt={produto.nome} />
        </div>
      </td>
      <td>{produto.nome}</td>
      <td>{produto.compra}</td>
      <td>{produto.venda}</td>
      <td>{produto.estoque}</td>
      <td>{produto.registro}</td>
      <td title={produto.descricao}>{produto.descricao}</td>
      <td className="acoes-prod">
        <button onClick={() => onEdit(produto)}>✏️</button> |
        <button onClick={() => onDelete(produto.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default ProdutoEstoque;
