import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import api from "../../provider/api.js";
import { ENDPOINTS } from "../../utils/endpoints.js";
import { toast } from "react-toastify";

export default function FormularioSenha() {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [senhaErro, setSenhaErro] = React.useState(false);
  const [erroLogin, setErroLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { id, idEmpresa, token } = useParams();


  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMuNDU2Ljc4OS0wMCIsImF1dGhvcml0aWVzIjoiUk9MRV9DT1pJTkhBLFJPTEVfRVNUT1FVRSxST0xFX0FURU5ESU1FTlRPLFJPTEVfUFJPUFJJRVRBUklPIiwiYWNlc3NvU2V0b3JDb3ppbmhhIjp0cnVlLCJhY2Vzc29TZXRvckVzdG9xdWUiOnRydWUsImFjZXNzb1NldG9yQXRlbmRpbWVudG8iOnRydWUsInByb3ByaWV0YXJpbyI6dHJ1ZSwiaWF0IjoxNzQ5ODM3ODk4LCJleHAiOjE3NTM0Mzc4OTh9.0yuLV6jyL6tKV9l4IX4h-gppYyl1oukiFhuoJteaM06DAyFc3GvGOeB4flkQIO-nqgDZjSExg8odAgL6dOMWww'
  useEffect(() => {
    if (id) {
      api
        .get(`${ENDPOINTS.FUNCIONARIOS}/${id}/${idEmpresa}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setUsuario(res.data);
        })
        .catch((err) => {
          toast.error("Erro ao buscar usuário, link inválido!")
          console.log("Erro ao buscar usuário: ", err);
        });
    }
  }, []);


  const validarDados = () => {
    setLoading(true);
    if (usuario === "" && senha === "") {
      setSenhaErro(true);
      setLoading(false);
      return false;
    }

    if (senha === "") {
      setSenhaErro(true);
      setLoading(false);
      return false;
    }

    if (senha.length < 11) {
      setSenhaErro(true);
      toast.error("A senha deve ter no mínimo 11 caracteres!");
      setLoading(false);
      return false;
    }

    enviarDados(usuario, senha);
    return true;
  };

  const enviarDados = async (usuario, senha) => {
    setLoading(true);
    api.patch(
      `${ENDPOINTS.FUNCIONARIOS}/${id}/${idEmpresa}`,
      {
        ...usuario,
        senha
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((res) => {
        setLoading(false);
        toast.success("Senha atualizada com sucesso!");
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
          value={usuario.cpf}
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
        >
          Redefinir Senha
        </button>
      </div>
    </form>
  );
}
