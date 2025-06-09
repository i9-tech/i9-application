import React from "react";
import "./DadosTabela.css";

const DadosTabela = ({ dados = [], aoEditar, aoExcluir }) => {
    
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
            {dados.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    padding: "24px",
                    textAlign: "center",
                    color: "#888",
                    fontSize: "1.1rem",
                    background: "#fff",
                    border: "20px",
                  }}>
                  Nenhum dado encontrado.
                </td>
              </tr>
            ) : (
              dados.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.pratos}</td>
                  <td>{item.produtos}</td>
                  <td className="tabela-dados__acoes">
                    <button onClick={() => aoEditar(item)} className="tabela-dados__botao editar">✏️</button>
                    <button onClick={() => aoExcluir(item)} className="tabela-dados__botao excluir">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default DadosTabela;
