import { useNavigate } from "react-router-dom";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import "./Login.css";
import { TbArrowBackUp } from "react-icons/tb";
import { useState } from "react";
import ModalSenha from "../../components/EsqueceuSenha/ModalSenha";
import ModalNotificacao from "../../components/EsqueceuSenha/ModalNotificacao";
import api from "../../provider/api";
import { toast } from "react-toastify";
import { ROUTERS } from "../../utils/routers";

export function Login() {
  const navigate = useNavigate();
  const [isSenhaEsquecida, setIsSenhaEsquecida] = useState(false);
  const [isEnviandoSenha, setIsEnviandoSenha] = useState(false);
  const [senhaEnviada, setSenhaEnviada] = useState(false);

  const enviarDadosRecuperacao = (cpf) => {
    const loadingToastId = toast.loading("Enviando e-mail, aguarde...");

    api
      .post("/recuperacoes/esqueceu-senha", { cpf: cpf })
      .then((res) => {
        console.log(res);
        setSenhaEnviada(true);
        setIsSenhaEsquecida(false);
        setIsEnviandoSenha(false);
        toast.update(loadingToastId, {
          render: "E-mail enviado com sucesso!",
          type: toast.success,
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log("Houve um erro ao enviar email:", err);
        setTimeout(() => {
          toast.update(loadingToastId, {
            render:
              "Erro ao enviar e-mail! Cadastro não encontrado ou desativado!",
            type: toast.error,
            isLoading: false,
            autoClose: 3000,
          });
          setIsEnviandoSenha(false);
        }, 3000);
      });
  };

  return (
    <>
      {isSenhaEsquecida && (
        <ModalSenha
          onClose={() => setIsSenhaEsquecida(false)}
          onSubmit={(cpf) => {
            setIsEnviandoSenha(true);
            enviarDadosRecuperacao(cpf);
          }}
          disabled={isEnviandoSenha}
        />
      )}
      {!isSenhaEsquecida && senhaEnviada && (
        <ModalNotificacao onClose={() => setSenhaEnviada(false)} />
      )}
      <section className="login">
        <span className="login-header">
          <div className="botoes-log">
            <button onClick={() => navigate("/")}>
              <TbArrowBackUp className="seta" /> VOLTAR
            </button>
          </div>
          <div className="saudacoes">
            <h1>
              i9 <br /> Boas Vindas
            </h1>
            <p>
              Entre em sua conta e tenha acesso a todas <br /> as
              funcionalidades
            </p>
          </div>
        </span>
        <FormularioLogin
          setIsSenhaEsquecida={setIsSenhaEsquecida}
          isSenhaEsquecida={isSenhaEsquecida}
        />
        <span className="login-footer">
          <p>
            Não possui uma conta?{" "}
            <hov
              onClick={() => {
                navigate(ROUTERS.HOME)
              }}
            >
              Contate-nos
            </hov>
          </p>
        </span>
      </section>
    </>
  );
}
