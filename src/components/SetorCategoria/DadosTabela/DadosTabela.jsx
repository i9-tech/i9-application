import React from "react";
import "./DadosTabela.css";
import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";

const DadosTabela = ({ dados = [], aoEditar, aoExcluir, isLoadingData, tipo }) => {
  const temPratos = dados.some(item => item.pratos !== undefined);
  const temProdutos = dados.some(item => item.produtos !== undefined);

  const columns = [
    { key: "nome", label: "Nome" },
    ...(temPratos ? [{ key: "pratos", label: "Pratos" }] : []),
    ...(temProdutos ? [{ key: "produtos", label: "Produtos" }] : []),
    { key: "acoes", label: "Ações" }
  ];

  return (
    <div className="tabela-wrapper">
      <table className="tabela-dados">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="tabela-scroll-area">
        <table className="tabela-dados">
          <tbody>
            {isLoadingData ? (
              <CarregamentoEstoque colunas={columns.length} temImagem={false} />
            ) : dados.length > 0 ? (
              [...dados].reverse().map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  {temPratos && <td>{item.pratos}</td>}
                  {temProdutos && <td>{item.produtos}</td>}
                  <td className="tabela-dados__acoes">
                    <button
                      type="button"
                      onClick={() => aoEditar(item)}
                      className="tabela-dados__botao editar"
                    >
                      ✏️
                    </button>
                    <span> | </span>
                    <button
                      type="button"
                      onClick={() => aoExcluir(item)}
                      className="tabela-dados__botao excluir"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <NoDataEstoque tipo={tipo === "setor" ? "setor" : "categoria"} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DadosTabela;
