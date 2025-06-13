import { useNavigate } from "react-router-dom";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import "./Login.css";
import { TbArrowBackUp } from "react-icons/tb";
import { useState } from "react";
import ModalSenha from "../../components/EsqueceuSenha/ModalSenha";
import ModalNotificacao from "../../components/EsqueceuSenha/ModalNotificacao";

export function Login() {
  const navigate = useNavigate();
  const [isSenhaEsquecida, setIsSenhaEsquecida] = useState(false);
  const [senhaEnviada, setSenhaEnviada] = useState(false);
  return (
    <>
      {isSenhaEsquecida && (
        <ModalSenha
          onClose={() => setIsSenhaEsquecida(false)}
          onSubmit={(cpf) => {
            console.log(cpf)
            setSenhaEnviada(true);
            setIsSenhaEsquecida(false);
          }}
          disabled={senhaEnviada}
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
            Não possui uma conta? <hov>Contate-nos</hov>
          </p>
        </span>
      </section>
    </>
  );
}
