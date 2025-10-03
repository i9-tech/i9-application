import { useState, useEffect } from "react";
import "./CadastroFuncionarioFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";
import CarregamentoFormulario from "../../Carregamento/CarregamentoFormulario";
import Select from "react-select";

const tipoLoginOptions = [
  { value: "", label: "Selecione a forma de login" },
  { value: "CPF", label: "CPF" },
  { value: "EMAIL", label: "E-mail" },
  { value: "TELEFONE", label: "Telefone" },
  { value: "MATRICULA", label: "Matrícula" }
];

const CadastroFuncionarioFormulario = ({
  funcionarioSelecionado,
  setFuncionarioSelecionado,
  atualizarListaFuncionarios,
}) => {
  const atualizarLoginAutomatico = (tipo) => {
    switch (tipo) {
      case "CPF":
        setLogin(cpfFuncionario);
        break;
      case "EMAIL":
        setLogin(emailFuncionario);
        break;
      case "TELEFONE":
      case "MATRICULA":
      default:
        setLogin("");
        break;
    }
  };

  const handleSetorChange = (setor, marcado) => {
    const atualizado = { ...setorFuncionario, [setor]: marcado };

    if (!atualizado.cozinha || !atualizado.estoque || !atualizado.atendimento) {
      atualizado.acessoTotal = false;
    }

    setSetorFuncionario(atualizado);
  };

  const handleAcessoTotalChange = (marcado) => {
    setSetorFuncionario({
      cozinha: marcado,
      estoque: marcado,
      atendimento: marcado,
      acessoTotal: marcado,
    });
  };

  const handleCpfChange = (valor) => {
    const cpfFormatado = formatarCpf(valor);
    setCpfFuncionario(cpfFormatado);

    if (tipoLogin === "CPF") {
      setLogin(cpfFormatado);
    }
  };

  const handleEmailChange = (valor) => {
    setEmailFuncionario(valor); 
    if (tipoLogin === "EMAIL") {
      setLogin(valor);
    }
  };

  const funcionario = getFuncionario();
  const [loading, setLoading] = useState(false);
  const [porcentagemCarregamento, setPorcentagemCarregamento] = useState(0);


  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cpfFuncionario, setCpfFuncionario] = useState("");
  const [emailFuncionario, setEmailFuncionario] = useState("");
  const [tipoLogin, setTipoLogin] = useState("");
  const [login, setLogin] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [setorFuncionario, setSetorFuncionario] = useState({
    cozinha: false,
    estoque: false,
    atendimento: false,
    acessoTotal: false,
  });
  const [_errorSetor, setErrorSetor] = useState(false);

  const limparFormulario = () => {
    setNomeFuncionario("");
    setCpfFuncionario("");
    setEmailFuncionario("")
    setTipoLogin("");
    setLogin("");
    setDataAdmissao("");
    setSetorFuncionario({
      cozinha: false,
      estoque: false,
      atendimento: false,
      acessoTotal: false,
    });
    setFuncionarioSelecionado(null);
  };

  useEffect(() => {
    if (funcionarioSelecionado) {
      setNomeFuncionario(funcionarioSelecionado.nome);
      setCpfFuncionario(funcionarioSelecionado.cpf);
      setEmailFuncionario(funcionarioSelecionado.email || "");
      setTipoLogin(funcionarioSelecionado.identificadorPrincipal);
      setLogin(funcionarioSelecionado.login);
      setDataAdmissao(funcionarioSelecionado.dataAdmissao);
      setSetorFuncionario({
        cozinha: funcionarioSelecionado.acessoSetorCozinha,
        estoque: funcionarioSelecionado.acessoSetorEstoque,
        atendimento: funcionarioSelecionado.acessoSetorAtendimento,
        acessoTotal: funcionarioSelecionado.proprietario,
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

    if (tipoLogin === "EMAIL") {
      if (!login.includes("@") || !login.includes(".")) {
        toast.error("Informe um e-mail válido!");
        return false;
      }
    }

    if (tipoLogin === "TELEFONE") {
      const regexTelefone = /^\d{2}\d{8,9}$/;
      if (!regexTelefone.test(login)) {
        toast.error("Informe um telefone válido! Ex: 11999999999");
        return false;
      }
    }

    if (funcionarioSelecionado) {
      editarFuncionario(nome, cpf, emailFuncionario, tipoLogin, login, data, setores, cpfSemFormatacao);
    } else {
      cadastrarFuncionario(nome, cpf, emailFuncionario, tipoLogin, login, data, setores, cpfSemFormatacao);
    }
    return true;
  };

  const cadastrarFuncionario = (nome, cpf, emailFuncionario, tipoLogin, login, data, setores, cpfSemFormatacao) => {
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
          identificadorPrincipal: tipoLogin,
          login: login,
          dataAdmissao: data,
          acessoSetorCozinha: setores.cozinha,
          acessoSetorEstoque: setores.estoque,
          acessoSetorAtendimento: setores.atendimento,
          proprietario: setorFuncionario.acessoTotal,
          senha: `${cpfSemFormatacao}@taua`,
          email: emailFuncionario,
          primeiroAcesso: true
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
        toast.error(`Erro ao cadastrar funcionário! ${error.response?.data?.message || ""}`);
        console.error("Erro ao cadastrar funcionário!", error);
        console.log('Mensagem exata do backend:', error.response.data);
      })
      .finally(() => {
        setLoading(false);
        console.log("Enviando email:", emailFuncionario);

      });
  };

  const editarFuncionario = () => {
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
          identificadorPrincipal: tipoLogin,
          login: login,
          cargo: "Funcionario",
          dataAdmissao: dataAdmissao,
          acessoSetorCozinha: setorFuncionario.cozinha,
          acessoSetorEstoque: setorFuncionario.estoque,
          acessoSetorAtendimento: setorFuncionario.atendimento,
          proprietario: setorFuncionario.acessoTotal,
          email: emailFuncionario,
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


        <div className="grupo-inputs" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
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
              onChange={(e) => handleCpfChange(e.target.value)}
              required
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              disabled={!!funcionarioSelecionado}
              maxLength={14}
              minLength={14}
            />

          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <label htmlFor="email">
              Email do Funcionário{" "}
            </label>

            <input
              id="email"
              type="text"
              placeholder="usuario@email.com"
              value={emailFuncionario}
              onChange={(e) => handleEmailChange(e.target.value)}
            />

          </div>
        </div>

        <div className="grupo-inputs" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <label htmlFor="formaLogin">
              Forma de Login{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
  inputId="tipoLogin"
  value={tipoLoginOptions.find(opt => opt.value === tipoLogin)}
  onChange={opt => {
    setTipoLogin(opt.value);
    atualizarLoginAutomatico(opt.value);
  }}
  options={tipoLoginOptions}
  placeholder="Selecione a forma de login"
  isSearchable={false}
  isDisabled={!!funcionarioSelecionado}
  styles={{
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused
        ? "var(--cor-para-o-texto-branco)"
        : "transparent",
      boxShadow: "none",
      "&:hover": { borderColor: "transparent" },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "var(--cor-para-texto-preto)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "var(--titulos-botoes-destaques)"
        : state.isFocused
        ? "var(--detalhes-2)"
        : "var(--cor-para-o-texto-branco)",
      color: state.isSelected
        ? "var(--cor-para-o-texto-branco)"
        : "var(--cor-para-texto-preto)",
      padding: 14,
      cursor: "pointer",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--cor-para-texto-preto)",
    }),
    menuList: (base) => ({
      ...base,
      overflowY: "auto",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 5,
      marginTop: 0,
    }),
  }}
/>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <label htmlFor="login">
              Login{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>{" "}
            </label>
            <input
              id="login"
              value={login}
              type="text"
              required
              maxLength={20}
              minLength={5}
              disabled={tipoLogin === "CPF" || tipoLogin === "EMAIL" || !!funcionarioSelecionado}
              placeholder="Informe o login do funcionário"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
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
                onChange={(e) => handleSetorChange("cozinha", e.target.checked)}
              /> Cozinha
            </label>

            <label>
              <input
                type="checkbox"
                checked={setorFuncionario.estoque}
                onChange={(e) => handleSetorChange("estoque", e.target.checked)}
              /> Estoque
            </label>

            <label>
              <input
                type="checkbox"
                checked={setorFuncionario.atendimento}
                onChange={(e) => handleSetorChange("atendimento", e.target.checked)}
              /> Atendimento
            </label>

            <label className="acesso-total-label">
              <input
                type="checkbox"
                checked={setorFuncionario.acessoTotal}
                onChange={(e) => handleAcessoTotalChange(e.target.checked)}
              /> Acesso Total
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
