import React from "react";

export default function DesktopFooter() {

  const navegarParaSecao = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
    <footer className="footer">

      <div className="footer-container">
      <div className="footer-esquerdo">
        <div className="logo" />
        <h3>i9Tech</h3>
        <p>
          Soluções inteligentes <br />
          para facilitar seu dia a <br />
          dia
        </p>
      </div>

      <div className="footer-direito">
        <ul>
          <li>
            <a onClick={() => navegarParaSecao("inicio")}>Início</a>
          </li>
          <li>
            <a onClick={() => navegarParaSecao("solucoes")}>Nossas Soluções</a>
          </li>
          <li>
            <a onClick={() => navegarParaSecao("sobre")}>Sobre Nós</a>
          </li>
          <li>
            <a onClick={() => navegarParaSecao("contato")}>Contato</a>
          </li>
        </ul>
      </div>
      </div>

    </footer>
  </>
  )
}
