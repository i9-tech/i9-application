import { useState, useEffect } from "react";
import "./CadastroFuncionarioFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";
import CarregamentoFormulario from "../../Carregamento/CarregamentoFormulario";

const CadastroFuncionarioFormulario = ({
  funcionarioSelecionado,
  setFuncionarioSelecionado,
  atualizarListaFuncionarios,
}) => {
  const funcionario = getFuncionario();
  const [loading, setLoading] = useState(false);
  const [porcentagemCarregamento, setPorcentagemCarregamento] = useState(0);


  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cpfFuncionario, setCpfFuncionario] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
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
  };

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
    const cpfSemFormatacao = removerFormatacaoCpf(cpf);

    if (!setores.cozinha && !setores.estoque && !setores.atendimento) {
      toast.error("Selecione pelo menos um setor!");
      setErrorSetor(true);
      return false;
    }

    if (funcionarioSelecionado) {
      editarFuncionario(nome, cpf, data, setores, cpfSemFormatacao);
    } else {
      cadastrarFuncionario(nome, cpf, data, setores, cpfSemFormatacao);
    }
    return true;
  };

  const cadastrarFuncionario = (nome, cpf, data, setores, cpfSemFormatacao) => {
    setLoading(true);
    setPorcentagemCarregamento(0);

    let progresso = 0;
    const interval = setInterval(() => {
      progresso += 10;
      if (progresso > 100) progresso = 100;
      setPorcentagemCarregamento(progresso);
    }, 400);

    const token = localStorage.getItem("token");

    api
      .post(
        `${ENDPOINTS.FUNCIONARIOS}/${funcionario.empresaId}`,
        {
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
        clearInterval(interval);
        setPorcentagemCarregamento(100);
        toast.success("Funcionário cadastrado com sucesso!");
        atualizarListaFuncionarios(response.data);
        limparFormulario();
      })
      .catch((error) => {
        clearInterval(interval);
        toast.error("Erro ao cadastrar funcionário! CPF Já cadastrado!");
        console.error("Erro ao cadastrar funcionário!", error);
         console.log('Mensagem exata do backend:', error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editarFuncionario = (nome, cpf, data, setores, cpfSemFormatacao) => {
    setLoading(true);
    setPorcentagemCarregamento(0);

    let progresso = 0;
    const interval = setInterval(() => {
      progresso += 10;
      if (progresso > 100) progresso = 100;
      setPorcentagemCarregamento(progresso);
    }, 400);

    const token = localStorage.getItem("token");
    api
      .patch(
        `${ENDPOINTS.FUNCIONARIOS}/${funcionarioSelecionado.id}/${funcionario.empresaId}`,
        {
          nome: nomeFuncionario,
          cpf: cpfFuncionario,
          cargo: "Funcionario",
          dataAdmissao: dataAdmissao,
          acessoSetorCozinha: setorFuncionario.cozinha,
          acessoSetorEstoque: setorFuncionario.estoque,
          acessoSetorAtendimento: setorFuncionario.atendimento,
          proprietario: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        clearInterval(interval);
        setPorcentagemCarregamento(100);
        toast.success("Funcionário editado com sucesso!");
        atualizarListaFuncionarios(response.data);
        limparFormulario();
      })
      .catch((error) => {
        toast.error("Erro ao editar funcionário!");
        console.error("Erro ao editar funcionário!", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      });
  };

  const formatarCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validarDados(
      nomeFuncionario,
      cpfFuncionario,
      dataAdmissao,
      setorFuncionario
    );
  };

  return (

    <div className="formulario-funcionario">
      {loading && <CarregamentoFormulario porcentagemCarregamento={porcentagemCarregamento} />}

      <p className="descricao-funcionario">
        Preencha o formulário abaixo para{" "}
        {funcionarioSelecionado ? "editar" : "adicionar"} funcionários.
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="grupo-inputs">
          <label htmlFor="nome">
            Nome do Funcionário{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>{" "}
          </label>
          <input
            id="nome"
            type="text"
            maxLength={40}
            placeholder="Informe o nome do funcionário"
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="cpf">
            CPF do Funcionário{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>{" "}
          </label>

          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpfFuncionario}
            onChange={(e) => setCpfFuncionario(formatarCpf(e.target.value))}
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            disabled={!!funcionarioSelecionado}
            maxLength={14}
            minLength={14}
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="data">
            Data de Admissão{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            id="data"
            type="date"
            placeholder="DD/MM/AAAA"
            value={dataAdmissao}
            onChange={(e) => setDataAdmissao(e.target.value)}
            required
            max={new Date().toISOString().split("T")[0]}
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
          <button type="submit" className="btn-cadastrar-funcionario">
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
