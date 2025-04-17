import React from "react";
import "./siteFooter.css";

const DesktopFooter = () => {
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
              <a href="#">Início</a>
            </li>
            <li>
              <a href="#">Nossas Soluções</a>
            </li>
            <li>
              <a href="#">Sobre Nós</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </div>
        </div>

      </footer>
    </>
  );
};

export default DesktopFooter;
