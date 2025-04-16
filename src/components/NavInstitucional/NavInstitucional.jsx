import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo-i9.png";

export default function NavInstitucional() {
  const navigate = useNavigate();

  const navegarParaSecao = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="nav-institucional">
        <div className="nav-logo">
          <img src={LOGO} alt="logotipo-i9" />
        </div>
        <span className="opcoes-nav">
        <div onClick={() => navegarParaSecao("inicio")}>Início</div>
        <div onClick={() => navegarParaSecao("solucoes")}>Nossas Soluções</div>
        <div onClick={() => navegarParaSecao("sobre")}>Sobre Nós</div>
        <div onClick={() => navegarParaSecao("contato")}>Contato</div>
        </span>
        <span className="entrar">
        <div><hov>Entre em contato conosco</hov></div>
        <div className="botao-enter"><button onClick={() => navigate("/login")}>Entrar</button></div>
        </span>
    </section>
    )
}
