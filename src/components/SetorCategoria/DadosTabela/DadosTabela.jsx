import React from "react";
import "./DadosTabela.css";
import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";

const DadosTabela = ({ dados = [], aoEditar, aoExcluir, isLoadingData, tipo }) => {
    
  return (
    <div className="tabela-wrapper">
      <table className="tabela-dados">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pratos</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
      </table>

      <div className="tabela-scroll-area">
        <table className="tabela-dados">
          <tbody>
            {isLoadingData ? (
              <CarregamentoEstoque colunas={4} temImagem={false} />
            ) : dados.length > 0 ? (
              [...dados].reverse().map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.pratos}</td>
                  <td>{item.produtos}</td>
                  <td className="tabela-dados__acoes">
                    <button onClick={() => aoEditar(item)} className="tabela-dados__botao editar">✏️ </button>
                    <span> | </span>
                    <button onClick={() => aoExcluir(item)} className="tabela-dados__botao excluir">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <NoDataEstoque tipo={tipo === "setor" ? "setor" : "categoria"} />
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default DadosTabela;
