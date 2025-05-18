import React, { useEffect, useState } from "react";
import "./PratoEstoque.css";
import { useNavigate } from "react-router-dom";

const PratoEstoque = ({ prato, buscar }) => {
  const navigate = useNavigate();
  const [valorVendaFormatado, setValorVendaFormatado] = useState("");

  useEffect(() => {
    formatarDados(prato)
  }, [])

  const formatarDados = (prato) => {

    // FORMATAÇÃO VALOR
    const VendaFormatado = Number(prato.valorVenda).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    setValorVendaFormatado(VendaFormatado);
  }

  const editar = (prato) => {
    navigate(`formulario-pratos/${prato.id}`);
  };

  const deletar = (id) => {
    if (confirm("Deseja deletar esse prato?")) {
      api
        .delete(`pratos/${id}`)
        .then(() => {
          console.log("Prato removido com sucesso!");
          buscar();
        })
        .catch((err) => {
          console.error("Erro ao remover prato:", err);
        });
    }
  };

  return (
    <tr className="linha-prato">
      <td>{prato.id}</td>
      <td>
        <div className="imagem-container">
          <img src={prato.imagem} alt={prato.nome} />
        </div>
      </td>
      <td>{prato.nome}</td>
      <td title={prato.descricao}>{prato.descricao}</td>
      <td>{valorVendaFormatado}</td>
      <td>{prato.disponivel ? (
        <span className="disponível">✅ Ativo</span>
      ) : (
        <span className="indisponível">🚫 Inativo</span>
      )}</td>
      <td>{prato.categoria?.id}</td>
      <td>{prato.setor?.id}</td>
      <td className="acoes">
        <button onClick={() => editar(prato)}>✏️</button> |
        <button onClick={() => deletar(prato.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default PratoEstoque;
