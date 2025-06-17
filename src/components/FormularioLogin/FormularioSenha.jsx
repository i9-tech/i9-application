import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../provider/api.js";
import { ENDPOINTS } from "../../utils/endpoints.js";
import { toast } from "react-toastify";
import { ROUTERS } from "../../utils/routers.js";

export default function FormularioSenha() {
  const [usuario, setUsuario] = React.useState("");
  // const [senha, setSenha] = React.useState("");
  const [senhaErro, setSenhaErro] = React.useState(false);
  const [erroLogin, setErroLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_erroApi, setErroApi] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      toast.error("Link de recuperação inválido ou incompleto!");
      setErroApi(
        "Link de recuperação inválido ou incompleto. Por favor, solicite um novo."
      );
    }
  }, [token]);
  
  useEffect(() => {
    if (token) {
      api
      .get(`/recuperacoes/${token}`)
      .then((res) => setUsuario(res.data))
      .catch((err) => console.log("Erro ao recuperar funcionário: ", err));
    }
  },[token]);

  const validarDados = async () => {
    setLoading(true);
    setSenhaErro(false);
    setErroApi("");

    if (novaSenha === "") {
      setSenhaErro(true);
      toast.error("Por favor, preencha o campo de senha!");
      setLoading(false);
      return;
    }

    if (novaSenha.length < 11) {
      setSenhaErro(true);
      toast.error("A senha deve ter no mínimo 11 caracteres!");
      setLoading(false);
      return false;
    }

    await enviarNovaSenha();
  };

  const enviarNovaSenha = async () => {
    setLoading(true);
    api
      .post("/recuperacoes/redefinir-senha", {
        token: token,
        novaSenha: novaSenha,
      })
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => {
          toast.success("Redirecionando para login...");
        }, 2000)
        setTimeout(() => {
          navigate(ROUTERS.LOGIN);
          setLoading(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Erro ao atualizar usuário:", err.message);
        toast.error("Erro ao atualizar usuário");
        setErroLogin(true);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  return (
    <form className="login-forms">
      <div className="login-input">
        <p>CPF Usuário</p>
        <input
          type="text"
          value={usuario}
          title="Não é possível alterar o CPF do usuário."
          onChange={(e) => {
            let valor = e.target.value;
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            setUsuario(valor);
            setErroLogin(false);
          }}
          disabled
        />
      </div>
      <div className="login-input">
        <p>Nova Senha</p>
        <input
          type="password"
          onChange={(e) => {
            setNovaSenha(e.target.value);
            setSenhaErro(false);
            setErroLogin(false);
          }}
          disabled={loading}
        />
        <span className={`span-erro ${senhaErro ? "visivel" : ""}`}>
          PREENCHA TODOS OS CAMPOS PARA CONTINUAR
        </span>
      </div>

      <div className="login-entrar">
        {loading ? (
          <div className="loading-spinner">Alterando senha...</div>
        ) : (
          <span className={`span-erro ${erroLogin ? "visivel" : ""}`}>
            ERRO AO ATUALIZAR SENHA!
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            validarDados();
          }}
          disabled={loading}
        >
          Redefinir Senha
        </button>
      </div>
    </form>
  );
}
