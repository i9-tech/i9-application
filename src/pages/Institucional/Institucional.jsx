import CardSobreposto from "../../components/CardSobreposto/CardSobreposto";
import "./Institucional.css";
import "../../index.css";
import Perguntas from "../../components/Perguntas/Perguntas";
import NavInstitucional from "../../components/NavInstitucional/NavInstitucional";
import CardsSobreNos from "../../components/CardsSobreNos/CardsSobreNos";
import DesktopInicio from "../../components/DesktopInicio/DesktopInicio";
import DesktopContato from "../../components/DesktopContato/DesktopContato";
import Planos from "../../components/Planos/Planos";

import DesktopFooter from "../../components/DesktopFooter/DesktopFooter";
import { useState, useEffect } from "react";

export function Institucional() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navegarParaSecao = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <NavInstitucional navegarParaSecao={navegarParaSecao} />
      <section className="institucional-home" id="inicio">
        <DesktopInicio navegarParaSecao={navegarParaSecao} />
      </section>
      <section className="institucional" id="solucoes">
        <CardSobreposto />
      </section>
      <section className="institucional-sobre" id="sobre">
        <CardsSobreNos />
      </section>
      <section className="institucional-perguntas" id="sobre">
        <Perguntas />
      </section>

       <section className="institucional-planos" id="planos">
        <Planos />
      </section>
      
      <section className="institucional-end" id="contato">
        <DesktopContato />
        <DesktopFooter />
      </section>
      
      {showScrollTop && (
        <button title="Voltar para o topo da página" className="botao-voltar-inicio" onClick={scrollToTop} aria-label="Voltar ao topo">
          ↑
        </button>
      )}
    </>
  );
}
