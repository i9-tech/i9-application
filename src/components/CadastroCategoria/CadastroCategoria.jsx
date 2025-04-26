import React from "react";
import "./CadastroCategoria.css";
import Navbar from "../Navbar/Navbar";

const CadastroCategoria = () => {
  return (
    <>

    <Navbar/>
    <div className="container-setor">
    <div className="formulario-funcionario">
      <h1 className="titulo">Cadastro de Setor Alimentício </h1>
      <p className="descricao">
        Preencha o formulário abaixo para adicionar novos setores alimentícios da sua empresa.
      </p>

      <form className="formulario">
        <div className="grupo">
          <label htmlFor="nome">Nome do Setor *</label>
          <input id="nome" type="text" placeholder="Informe o nome do setor a ser cadastrado"
          />
        </div>
        <div className="botoes">
          <button type="button" className="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>
        </div>
      </form>

    </div>

    
    <table className="tabela">
        <thead>
          <tr>
            <th className="coluna-nome">Nome do Setor</th>
            <th className="coluna-acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="nome-setor">Cozinha</td>
            <td className="acoes">
              <button className="btn-editar">Editar</button>
              <button className="btn-excluir">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};

export default CadastroCategoria;
