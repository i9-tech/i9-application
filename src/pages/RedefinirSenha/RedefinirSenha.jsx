import { useNavigate } from "react-router-dom";
import "./RedefinirSenha.css";
import { TbArrowBackUp } from "react-icons/tb";
import FormularioSenha from "../../components/FormularioLogin/FormularioSenha";

export function RedefinirSenha() {
  const navigate = useNavigate();
  return (
    <>
      <section className="login">
        <span className="login-header">
          <div className="botoes-log">
            <button onClick={() => navigate("/")}>
              <TbArrowBackUp className="seta" /> VOLTAR
            </button>
          </div>
          <div className="saudacoes">
            <h1>
              i9 <br /> Redefinir Senha
            </h1>
            <p>
              Por favor, insira uma nova senha para continuar!
            </p>
          </div>
        </span>
        <FormularioSenha
        />
      </section>
    </>
  );
}
