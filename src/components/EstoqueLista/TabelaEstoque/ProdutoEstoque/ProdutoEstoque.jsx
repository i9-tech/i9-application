import React, { useEffect, useState } from "react";
import "./ProdutoEstoque.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../provider/api";
import { Tooltip } from "react-tooltip";

const ProdutoEstoque = ({ produto, buscar }) => {
  const navigate = useNavigate();
  const [dataFormatada, setDataFormatada] = useState("");
  const [valorCompraFormatado, setValorCompraFormatado] = useState("");
  const [valorUnitarioFormatado, setValorUnitarioFormatado] = useState("");


  useEffect(() => {
    formatarDados(produto)
  }, [])


  const formatarDados = (produto) => {

    // FORMATAÇÃO DATA
    const dataFormatada = new Date(produto.dataRegistro).toLocaleDateString("pt-BR")

    setDataFormatada(dataFormatada)

    // FORMATAÇÃO VALOR
    const CompraFormatado = Number(produto.valorCompra).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    setValorCompraFormatado(CompraFormatado);
    
    const UnitarioFormatado = Number(produto.valorUnitario).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    setValorUnitarioFormatado(UnitarioFormatado);
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
      <td>{valorCompraFormatado}</td>
      <td>{valorUnitarioFormatado}</td>
      <td>
        <span
          data-tooltip-id="tooltip-quantidade"
          data-tooltip-content={`Estoque máximo: ${produto.quantidadeMax}\nEstoque mínimo: ${produto.quantidadeMin}`}
          style={{ display: "inline-block", width: "100%", cursor: "pointer" }}
        >
          {produto.quantidade}
        </span>
      </td>
      <td>{dataFormatada}</td>
      <td title={produto.descricao}>{produto.descricao}</td>
      <td className="acoes-prod">
        <button onClick={() => editar(produto)}>✏️</button> |
        <button onClick={() => deletar(produto.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default ProdutoEstoque;
