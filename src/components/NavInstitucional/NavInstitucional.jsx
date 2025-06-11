import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo-i9.png";
import { ROUTERS } from "../../utils/routers";

export default function NavInstitucional({navegarParaSecao}) {
  const navigate = useNavigate();
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
        <div><hov onClick={() => navegarParaSecao("contato")}>Entre em contato conosco</hov></div>
        <div className="botao-enter"><button onClick={() => navigate(ROUTERS.LOGIN)}>Entrar</button></div>
        </span>
    </section>
    )
}
