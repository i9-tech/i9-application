import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo-i9.png";
import { ROUTERS } from "../../utils/routers";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavInstitucional({ navegarParaSecao }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="nav-institucional">
      <span className="nav-desktop">
        <div className="nav-logo">
          <img src={LOGO} alt="logotipo-i9" />
        </div>
        <span className="opcoes-nav">
          <div onClick={() => navegarParaSecao("inicio")}>Início</div>
          <div onClick={() => navegarParaSecao("solucoes")}>
            Nossas Soluções
          </div>
          <div onClick={() => navegarParaSecao("sobre")}>Sobre Nós</div>
          <div onClick={() => navegarParaSecao("contato")}>Contato</div>
        </span>
        <span className="entrar">
          <div>
            <hov onClick={() => navegarParaSecao("contato")}>
              Entre em contato conosco
            </hov>
          </div>
          <div className="botao-enter">
            <button onClick={() => navigate(ROUTERS.LOGIN)}>Entrar</button>
          </div>
        </span>
      </span>
      <span className="nav-hamburguer">
        <div className="nav-logo">
          <img src={LOGO} alt="logotipo-i9" />
        </div>
        <div className="hamburguer-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={45} color="black" /> : <FiMenu size={45} color="black" />}
        </div>
        <div className={`hamburguer-menu-content ${isMenuOpen ? 'open' : ''}`}>
          <span className="opcoes-nav-mobile">
            <div onClick={() => navegarParaSecao("inicio")}>Início</div>
            <div onClick={() => navegarParaSecao("solucoes")}>
              Nossas Soluções
            </div>
            <div onClick={() => navegarParaSecao("sobre")}>Sobre Nós</div>
            <div onClick={() => navegarParaSecao("contato")}>Contato</div>
          </span>
          <span className="entrar-mobile">
            <div>
              <hov onClick={() => navegarParaSecao("contato")}>
                Entre em contato conosco
              </hov>
            </div>
            <div className="botao-enter">
              <button>Entrar</button>
            </div>
          </span>
        </div>
      </span>
    </section>
  );
}
