import React from "react";
import "./PratoEstoque.css";

const PratoEstoque = ({ prato, onEdit, onDelete }) => {
  return (
    <tr className="linha-prato">
      <td>{prato.id}</td>
      <td>
        <div className="imagem-container">
          <img src={prato.imagemUrl} alt={prato.nome} />
        </div>
      </td>
      <td>{prato.nome}</td>
      <td>{prato.preco}</td>
      <td>{prato.categoria}</td>
      <td>{prato.status}</td>
      <td>{prato.registro}</td>
      <td title={prato.descricao}>{prato.descricao}</td>
      <td className="acoes">
        <button onClick={() => onEdit(prato)}>✏️</button> |
        <button onClick={() => onDelete(prato.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default PratoEstoque;
