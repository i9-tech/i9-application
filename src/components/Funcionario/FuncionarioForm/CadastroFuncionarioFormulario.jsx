import { useState, useEffect } from "react";
import "./CadastroFuncionarioFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";

const CadastroFuncionarioFormulario = ({
  funcionarioSelecionado,
  setFuncionarioSelecionado,
}) => {
  const funcionario = getFuncionario();

  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [_errorNome, setErrorNome] = useState(false);
  const [cpfFuncionario, setCpfFuncionario] = useState("");
  const [_errorCpf, setErrorCpf] = useState(false);
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [_errorData, setErrorData] = useState(false);
  const [setorFuncionario, setSetorFuncionario] = useState({
    cozinha: false,
    estoque: false,
    atendimento: false,
  });
  const [_errorSetor, setErrorSetor] = useState(false);

  const limparFormulario = () => {
    setNomeFuncionario("");
    setCpfFuncionario("");
    setDataAdmissao("");
    setSetorFuncionario({
      cozinha: false,
      estoque: false,
      atendimento: false,
    });
    setFuncionarioSelecionado(null);
    setFuncionarioSelecionado(null);
  };

  // const [showModal, setShowModal] = useState(false);
  // const [modalMensagem, setModalMensagem] = useState("");

  useEffect(() => {
    if (funcionarioSelecionado) {
      setNomeFuncionario(funcionarioSelecionado.nome);
      setCpfFuncionario(funcionarioSelecionado.cpf);
      setDataAdmissao(funcionarioSelecionado.dataAdmissao);
      setSetorFuncionario({
        cozinha: funcionarioSelecionado.acessoSetorCozinha,
        estoque: funcionarioSelecionado.acessoSetorEstoque,
        atendimento: funcionarioSelecionado.acessoSetorAtendimento,
      });
    }
  }, [funcionarioSelecionado]);

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

    if (funcionarioSelecionado) {
      editarFuncionario(nome, cpf, data, setores, cpfSemFormatacao);
    } else {
      cadastrarFuncionario(nome, cpf, data, setores, cpfSemFormatacao);
    }
  };

  const cadastrarFuncionario = (nome, cpf, data, setores, cpfSemFormatacao) => {
    const token = localStorage.getItem("token");

    console.log("Cadastrando funcionário:", { nome, cpf, data, setores });
    console.log("Token:", localStorage.getItem("token")),
      api
        .post(`${ENDPOINTS.FUNCIONARIOS}/${funcionario.empresaId}`, {
          nome: nome,
          cpf: cpf,
          cargo: "Funcionário",
          dataAdmissao: data,
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
          toast.success("Funcionário cadastrado com sucesso!");
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((error) => {
          console.error("Erro ao cadastrar funcionário:", error);
          toast.error("Erro ao cadastrar funcionário!");
        });
  };

  const editarFuncionario = (nome, cpf, data, setores, cpfSemFormatacao) => {
    const token = localStorage.getItem("token");

    console.log("Funcionario selecionado:", funcionarioSelecionado.id);
    console.log("Editando funcionário:", { nome, cpf, data, setores });
    api
      .patch(`${ENDPOINTS.FUNCIONARIOS}/${funcionarioSelecionado.id}/${funcionario.empresaId}`, {
        nome: nomeFuncionario,
        cpf: cpfFuncionario,
        cargo: "Funcionario",
        dataAdmissao: dataAdmissao,
        acessoSetorCozinha: setorFuncionario.cozinha,
        acessoSetorEstoque: setorFuncionario.estoque,
        acessoSetorAtendimento: setorFuncionario.atendimento,
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
        console.log("Funcionário editado com sucesso:", response.data);
        toast.success("Funcionário editado com sucesso!");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        console.error("Erro ao editar funcionário:", error);
        toast.error("Erro ao editar funcionário!");
      });
  };

  const formatarCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for dígito
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
  };


  return (
    <div className="formulario-funcionario">
      <p className="descricao-funcionario">
        Preencha o formulário abaixo para{" "}
        {funcionarioSelecionado ? "editar" : "adicionar"} funcionários.
      </p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Funcionário *</label>
          <input
            id="nome"
            type="text"
            placeholder="Informe o nome do funcionário"
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            required
          />
        </div>

        <div className="grupo-inputs">
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpfFuncionario}
            maxLength={14}
            onChange={(e) => {
              let valor = e.target.value;
              valor = valor.replace(/\D/g, ""); 
              valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
              valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
              valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
              setCpfFuncionario(valor); 
            }}
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            disabled={!!funcionarioSelecionado}
            maxLength={14} />

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
            disabled={!!funcionarioSelecionado}
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
          <button
            type="submit"
            className="btn-cadastrar-funcionario"
            onClick={(e) => {
              e.preventDefault();
              validarDados(
                nomeFuncionario,
                cpfFuncionario,
                dataAdmissao,
                setorFuncionario
              );
            }}
          >
            {funcionarioSelecionado ? "Editar" : "Cadastrar"}
          </button>

          <button
            type="button"
            className="btn-cancelar-funcionario"
            onClick={limparFormulario}
          >
            Cancelar
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default CadastroFuncionarioFormulario;
