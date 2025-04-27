import React from "react";
import "./CadastroFuncionarioFormulario.css";
import { useState } from "react";
import api from "../../../provider/api";

const CadastroFuncionarioFormulario = () => {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [errorNome, setErrorNome] = useState(false);
  const [cpfFuncionario, setCpfFuncionario] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [errorData, setErrorData] = useState(false);
  const [setorFuncionario, setSetorFuncionario] = useState({
    cozinha: false,
    estoque: false,
    atendimento: false,
  });
  const [errorSetor, setErrorSetor] = useState(false);

  const removerFormatacaoCpf = (cpf) => {
    return cpf.replace(/\D/g, ""); 
  };

  const validarDados = (nome, cpf, data, setores) => {
    console.log("Validando dados:", { nome, cpf, data, setores });
    if (nome === "") {
      setErrorNome(true);
      alert("Nome inválido!");
      return false;
    }
    if (cpf === "") {
      setErrorCpf(true);
      alert("CPF inválido!");
      return false;
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setErrorCpf(true);
      alert("CPF inválido! O CPF deve estar no formato 000.000.000-00.");
      return false;
    }

    const cpfSemFormatacao = removerFormatacaoCpf(cpf);

    if (data === "") {
      alert("Data inválida!");
      setErrorData(true);
      return false;
    } else if (new Date(data) > new Date()) {
      alert("Data inválida! A data de admissão não pode ser posterior a hoje.");
      setErrorData(true);
      return false;
    }

    if (!setores.cozinha && !setores.estoque && !setores.atendimento) {
      alert("Selecione pelo menos um setor!");
      setErrorSetor(true);
      return false;
    }

    cadastrarFuncionario(nome, cpf, data, setores, cpfSemFormatacao);
  };
  

  const cadastrarFuncionario = (nome, cpf, data, setores, cpfSemFormatacao) => {
    const token = localStorage.getItem("token");


    console.log("Cadastrando funcionário:", { nome, cpf, data, setores });
    console.log("Token:", localStorage.getItem("token")),
      api
        .post("/colaboradores/1", {
          nome: nome,
          cpf: cpf,
          cargo: "Funcionário",
          dataAdmissao: "2025-04-25",
          acessoSetorCozinha: setores.cozinha,
          acessoSetorEstoque: setores.estoque,
          acessoSetorAtendimento: setores.atendimento,
          proprietario: false,
          senha: `${cpfSemFormatacao}@taua`, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          console.log("Funcionário cadastrado com sucesso:", response.data);
          // Aqui você pode adicionar lógica para atualizar a lista de funcionários ou exibir uma mensagem de sucesso
        })
        .catch((error) => {
          console.error("Erro ao cadastrar funcionário:", error);
        });
  };

  return (
    <div className="formulario-funcionario">
      <h1 className="titulo-funcionario">Cadastro de Funcionário</h1>
      <p className="descricao-funcionario">
        Preencha o formulário abaixo para adicionar novos funcionários.
      </p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Funcionário *</label>
          <input
            id="nome"
            type="text"
            placeholder="Informe o nome do funcionário a ser cadastrado"
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            required
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="cpf">CPF do Funcionário *</label>
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpfFuncionario}
            onChange={(e) => setCpfFuncionario(e.target.value)}
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="data">Data de Admissão *</label>
          <input
            id="data"
            type="date"
            placeholder="DD/MM/AAAA"
            value={dataAdmissao}
            onChange={(e) => setDataAdmissao(e.target.value)}
            required
            max={new Date().toISOString().split("T")[0]} // Data máxima é a data atual
          />
        </div>

        <div className="grupo-checkbox">
          <span>Setor do Funcionário *</span>
          <div className="checkboxes-funcionario">
            <label>
              <input
                type="checkbox"
                checked={setorFuncionario.cozinha}
                onChange={(e) =>
                  setSetorFuncionario({
                    ...setorFuncionario,
                    cozinha: e.target.checked,
                  })
                }
              />{" "}
              Cozinha
            </label>
            <label>
              <input
                type="checkbox"
                checked={setorFuncionario.estoque}
                onChange={(e) =>
                  setSetorFuncionario({
                    ...setorFuncionario,
                    estoque: e.target.checked,
                  })
                }
              />{" "}
              Estoque
            </label>
            <label>
              <input
                type="checkbox"
                checked={setorFuncionario.atendimento}
                onChange={(e) =>
                  setSetorFuncionario({
                    ...setorFuncionario,
                    atendimento: e.target.checked,
                  })
                }
              />{" "}
              Atendimento
            </label>
          </div>
        </div>

        <div className="botoes-funcionario">
          <button type="button" className="btn-cancelar">
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-cadastrar"
            onClick={(e) => {
              e.preventDefault();
              validarDados(
                nomeFuncionario,
                cpfFuncionario,
                dataAdmissao,
                setorFuncionario
              );
              // testePost();
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroFuncionarioFormulario;
