import React, { useState } from "react";
import "./ProdutoEstoque.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../provider/api";
import { Tooltip } from "react-tooltip";

const ProdutoEstoque = ({ produto, buscar }) => {
  const navigate = useNavigate();
  const [data, setData] = useState()
  
  const formatarDados = (produto) => {

  }

  const editar = (produto) => {
    navigate(`formulario-produtos/${produto.id}`);
  };

  const deletar = (id) => {
    if (confirm("Deseja deletar esse produto?")) {
      api
        .delete(`produtos/${id}`)
        .then(() => {
          console.log("Produto removido com sucesso!");
          buscar();
        })
        .catch((err) => {
          console.error("Erro ao remover produto:", err);
        });
    }
  };

  return (
      <tr className="linha-produto-prod">
        <td>{produto.codigo}</td>
        <td>
          <div className="imagem-container-prod">
            <img src={produto.imagem} alt={produto.nome} />
          </div>
        </td>
        <td>{produto.nome}</td>
        <td>R$ {produto.valorCompra}</td>
        <td>R$ {produto.valorUnitario}</td>
        <td>
          <span
            data-tooltip-id="tooltip-quantidade"
            data-tooltip-content={`Estoque máximo: ${produto.quantidadeMax}\nEstoque mínimo: ${produto.quantidadeMin}`}
            style={{ display: "inline-block", width: "100%", cursor: "pointer" }}
          >
            {produto.quantidade}
          </span>
        </td>
        <td>{produto.dataRegistro}</td>
        <td title={produto.descricao}>{produto.descricao}</td>
        <td className="acoes-prod">
          <button onClick={() => editar(produto)}>✏️</button> |
          <button onClick={() => deletar(produto.id)}>🗑️</button>
        </td>
      </tr>
  );
};

export default ProdutoEstoque;
