import React from "react";
import "./ProdutoEstoque.css";

const ProdutoEstoque = ({ produto, onEdit, onDelete }) => {
  return (
    <tr className="linha-produto">
      <td>{produto.id}</td>
      <td>
        <div className="imagem-container">
          <img src={produto.imagem} alt={produto.nome} />
        </div>
      </td>
      <td>{produto.nome}</td>
      <td>{produto.compra}</td>
      <td>{produto.venda}</td>
      <td>{produto.estoque}</td>
      <td>{produto.registro}</td>
      <td title={produto.descricao}>{produto.descricao}</td>
      <td className="acoes">
        <button onClick={() => onEdit(produto)}>✏️</button> |
        <button onClick={() => onDelete(produto.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default ProdutoEstoque;
