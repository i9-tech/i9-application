import { useNavigate } from "react-router-dom";
import api from "../../provider/api.js";
import { ENDPOINTS } from "../../utils/endpoints.js";
import { getPermissoes, getPrimeiraRotaPermitida } from "../../utils/auth.js";
import ModalRedefinirPrimeiroAcesso from "../RedefinicaoSenhaAutomatica/ModalRedefinirPrimerioAcesso.jsx";
import { useState } from "react";
import { useBloqueioTemporario } from "../useBloqueioTemporario/useBloqueioTemporario.jsx";
import ModalBloqueio from "../EsqueceuSenha/ModalBloqueio.jsx";
export default function FormularioLogin({
  isSenhaEsquecida,
  setIsSenhaEsquecida,
}) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioErro, setUsuarioErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const [erroLogin, setErroLogin] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [mostrarModalBloqueio, setMostrarModalBloqueio] = useState(false);

  const { bloqueado, iniciarBloqueio, formatarTempo } = useBloqueioTemporario(
    "i9_bloqueio_login_timestamp"
  );

  const navigate = useNavigate();

  const validarDados = () => {
    if (bloqueado) return;

    setLoading(true);
    if (usuario === "" || senha === "") {
      if (usuario === "") setUsuarioErro(true);
      if (senha === "") setSenhaErro(true);
      setLoading(false);
      return false;
    }

    enviarDados(usuario, senha);
    return true;
  };

  const enviarDados = async (usuario, senha) => {
    api
      .post(ENDPOINTS.LOGIN, { login: usuario, senha: senha })
      .then((res) => {
        setErroLogin(false);
        localStorage.removeItem("i9_bloqueio_login_timestamp");

        const token = res.data.token;
        const funcionario = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("funcionario", JSON.stringify(funcionario));

        if (funcionario.primeiroAcesso) {
          setMostrarModalSenha(true);
        } else {
          const permissoes = getPermissoes();
          const rotaInicial = getPrimeiraRotaPermitida(permissoes);
          navigate(rotaInicial);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao validar usuário:", err);
        setLoading(false);

        if (err.response && err.response.status === 429) {
          const mensagemBackend = err.response.data.message;
          // BLOQUEIO DE 30 MINUTOS
          const matchMinutos = mensagemBackend.match(/(\d+)/);
          const _minutos = matchMinutos ? parseInt(matchMinutos[0]) : 30;
          // const segundosTotais = minutos * 60;

          // BLOQUEIO DE 30 SEGUNDOS
          const segundosTotais = 30;

          iniciarBloqueio(segundosTotais);

        } else {
          setErroLogin(true);
          setMensagemErro("USUÁRIO E/OU SENHA INVÁLIDO(S)!");
        }
      });
  };

  return (
    <>
      <form className="login-forms">
        <div
          className={`login-input ${
            bloqueado || loading ? "desabilitado" : ""
          }`}
        >
          <p style={{ fontWeight: "500" }}>Usuário</p>
          <input
            type="text"
            value={usuario}
            disabled={bloqueado}
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

        <div
          className={`login-input ${
            bloqueado || loading ? "desabilitado" : ""
          }`}
        >
          <p style={{ fontWeight: "500" }}>Senha</p>
          <input
            type="password"
            disabled={bloqueado}
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
            <div className="loading-spinner">VERIFICANDO DADOS...</div>
          ) : bloqueado ? (
            <>
              <span
                className="span-erro visivel"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                MUITAS TENTATIVAS INCORRETAS. <br />
                TENTE NOVAMENTE EM {formatarTempo()}
              </span>
              <p
                style={{
                  color: "#0F14B8",
                  cursor: "pointer",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
                onClick={() => setMostrarModalBloqueio(true)}
              >
                POR QUE ISSO ACONTECE?
              </p>
            </>
          ) : (
            <span className={`span-erro ${erroLogin ? "visivel" : ""}`}>
              {mensagemErro}
            </span>
          )}

          <button
            disabled={bloqueado || loading}
            className={bloqueado ? "botao-desabilitado" : ""}
            onClick={(e) => {
              e.preventDefault();
              validarDados();
            }}
          >
            ENTRAR
          </button>

          {!bloqueado && (
            <p>
              <hov onClick={() => setIsSenhaEsquecida(!isSenhaEsquecida)}>
                Você esqueceu a senha?
              </hov>
            </p>
          )}
        </div>
      </form>
      {mostrarModalBloqueio && (
        <ModalBloqueio onClose={() => setMostrarModalBloqueio(false)} />
      )}
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
