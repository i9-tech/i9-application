import React from "react";
import "./CadastroFuncionarioFormulario.css";

const CadastroFuncionarioFormulario = () => {
  return (
    <div className="formulario-funcionario">
      <h1 className="titulo-funcionario">Cadastro de Funcionário</h1>
      <p className="descricao-funcionario">
        Preencha o formulário abaixo para adicionar novos funcionários.
      </p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Funcionário *</label>
          <input id="nome" type="text" placeholder="Informe o nome do funcionário a ser cadastrado"
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="cpf">CPF do Funcionário *</label>
          <input id="cpf" type="text" placeholder="000.000.000-00" />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="data">Data de Admissão *</label>
          <input id="data" type="date" placeholder="DD/MM/AAAA" />
        </div>

        <div className="grupo-checkbox">
          <span>Setor do Funcionário *</span>
          <div className="checkboxes-funcionario">
            <label>
              <input type="checkbox" /> Cozinha
            </label>
            <label>
              <input type="checkbox" /> Estoque
            </label>
            <label>
              <input type="checkbox" /> Atendimento
            </label>
          </div>
        </div>

        <div className="botoes-funcionario">
          <button type="button" className="btn-cancelar">
            Cancelar
          </button>
          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroFuncionarioFormulario;
