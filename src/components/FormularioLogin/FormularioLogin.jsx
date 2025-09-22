import { useNavigate } from "react-router-dom";
import React from "react";
import api from "../../provider/api.js";
import { ENDPOINTS } from "../../utils/endpoints.js";
import { getPermissoes, getPrimeiraRotaPermitida } from "../../utils/auth.js";
import ModalRedefinirPrimeiroAcesso from "../RedefinicaoSenhaAutomatica/ModalRedefinirPrimerioAcesso.jsx";

export default function FormularioLogin({ isSenhaEsquecida, setIsSenhaEsquecida }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [usuarioErro, setUsuarioErro] = React.useState(false);
  const [senhaErro, setSenhaErro] = React.useState(false);
  const [erroLogin, setErroLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mostrarModalSenha, setMostrarModalSenha] = React.useState(false);


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
        login: usuario,
        senha: senha,
      })
      .then((res) => {
        const token = res.data.token;
        const funcionario = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("funcionario", JSON.stringify(funcionario));

        if (funcionario.primeiroAcesso) {
          // Primeiro acesso → abre modal
          setMostrarModalSenha(true);
        } else {
          // Usuário normal → navega direto
          const permissoes = getPermissoes();
          const rotaInicial = getPrimeiraRotaPermitida(permissoes);
          navigate(rotaInicial);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao validar usuário:", err);
        setErroLogin(true);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  return (
    <>
    <form className="login-forms">
      <div className="login-input">
        <p style={{ fontWeight: "500" }}>Usuário</p>
        <input
          type="text"
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setUsuarioErro(false);
            setErroLogin(false);
          }}
        />
        <span className={`span-erro ${usuarioErro ? "visivel" : ""}`}>
          PREENCHA TODOS OS CAMPOS PARA CONTINUAR
        </span>
      </div>
      <div className="login-input">
        <p style={{ fontWeight: "500" }}>Senha</p>
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
      {mostrarModalSenha && (
        <ModalRedefinirPrimeiroAcesso
          onClose={() => setMostrarModalSenha(false)}
          onSubmit={() => {
            setMostrarModalSenha(false);
            const permissoes = getPermissoes();
            const rotaInicial = getPrimeiraRotaPermitida(permissoes);
            navigate(rotaInicial);
          }}
        />

        
      )}
    </>
  );
}
