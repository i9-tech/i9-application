import { useNavigate } from "react-router-dom";
import React from "react";
import api from "../../provider/api.js";
import { ENDPOINTS } from "../../utils/endpoints.js";
import { getPermissoes, getPrimeiraRotaPermitida } from "../../utils/auth.js";
import { toast } from "react-toastify";

export default function FormularioLogin({isSenhaEsquecida, setIsSenhaEsquecida}) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [usuarioErro, setUsuarioErro] = React.useState(false);
  const [senhaErro, setSenhaErro] = React.useState(false);
  const [erroLogin, setErroLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validarDados = () => {
    setLoading(true);
    if (usuario === "" && senha === "") {
      setUsuarioErro(true);
      setSenhaErro(true);
      setLoading(false);
      return false;
    }

    if (usuario === "") {
      setUsuarioErro(true);
      setLoading(false);
      return false;
    }

    if (senha === "") {
      setSenhaErro(true);
      setLoading(false);
      return false;
    }

    enviarDados(usuario, senha);
    return true;
  };

  const enviarDados = async (usuario, senha) => {
    api
      .post(ENDPOINTS.LOGIN, {
        cpf: usuario,
        senha: senha,
      })
      .then((res) => {
        const token = res.data.token;
        const funcionario = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("funcionario", JSON.stringify(funcionario));

        const permissoes = getPermissoes();
        const rotaInicial = getPrimeiraRotaPermitida(permissoes);

        setTimeout(() => {
          navigate(rotaInicial);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Erro ao validar usuário:", err);
        setErroLogin(true);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  return (
    <form className="login-forms">
      <div className="login-input">
        <p>Usuario</p>
        <input
          type="text"
          value={usuario}
          maxLength={14}
          onChange={(e) => {
            let valor = e.target.value;
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            setUsuario(valor);
            setUsuarioErro(false);
            setErroLogin(false);
          }}
        />
        <span className={`span-erro ${usuarioErro ? "visivel" : ""}`}>
          PREENCHA TODOS OS CAMPOS PARA CONTINUAR
        </span>
      </div>
      <div className="login-input">
        <p>Senha</p>
        <input
          type="password"
          onChange={(e) => {
            setSenha(e.target.value);
            setSenhaErro(false);
            setErroLogin(false);
          }}
        />
        <span className={`span-erro ${senhaErro ? "visivel" : ""}`}>
          PREENCHA TODOS OS CAMPOS PARA CONTINUAR
        </span>
      </div>
      <div className="login-entrar">
        {loading ? (
          <div className="loading-spinner">Verificando dados...</div>
        ) : (
          <span className={`span-erro ${erroLogin ? "visivel" : ""}`}>
            USUÁRIO E/OU SENHA INVÁLIDO(S)!
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            validarDados();
          }}
        >
          Entrar
        </button>
        <p>
          <hov onClick={() => setIsSenhaEsquecida(!isSenhaEsquecida)}>Você esqueceu a senha?</hov>
        </p>
      </div>
    </form>
  );
}
