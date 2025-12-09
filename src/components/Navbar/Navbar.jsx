import "./Navbar.css";
import { useEffect, useState } from "react";
import { Options } from "../Options/Options";
import LOGO_I9 from "../../assets/logo-i9.png";
import { getFuncionario } from "../../utils/auth";
import { Tooltip } from "react-tooltip";
import { getSaudacao } from "../../utils/utils";
import { clearFiltrosPratos, clearFiltrosProdutos } from "../../utils/filters";

export function Navbar() {
  const funcionario = getFuncionario();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ Detectar se é mobile (ajusta quando redimensiona)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Controla clique nos itens do menu
  useEffect(() => {
    const itensMenu = document.querySelectorAll(".navbar ul li");

    const handleClick = (event) => {
      itensMenu.forEach((i) => i.classList.remove("clicked"));
      event.currentTarget.classList.add("clicked");

      if(event.target.alt != "Icone de Estoque de Produtos") {
        clearFiltrosProdutos();
      }
      if(event.target.alt != "Icone de Estoque de Pratos") {
        clearFiltrosPratos();
      }
    };

    itensMenu.forEach((item) =>
      item.addEventListener("click", handleClick)
    );

    return () => {
      itensMenu.forEach((item) =>
        item.removeEventListener("click", handleClick)
      );
    };
  }, []);

  return (
    <>
      {/* ✅ Botão hamburguer visível SOMENTE no mobile E quando menu estiver fechado */}
      {isMobile && !isNavbarOpen && (
        <button
          className="menu-mobile-toggle"
          onClick={() => setIsNavbarOpen(true)}
        >
          ☰
        </button>
      )}

      <nav className={`navbar ${isNavbarOpen ? "aberta" : ""}`} id="navbar">
        <div className="user">
          <i
            className={!isNavbarOpen ? "show" : "hide"}
            style={{ marginLeft: "2px" }}
          >
            <img src={LOGO_I9} alt="Ícone de Usuário" />
          </i>
          <span
            title={`${getSaudacao()}, ${funcionario.nome}`}
            className={`nome-usuario ${isNavbarOpen ? "show" : "hide"}`}
          >
            {getSaudacao()}, {funcionario.nome}!
          </span>
        </div>

        <ul>
          <Options
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
        </ul>
      </nav>

      {/* ✅ Overlay escuro para fechar o menu mobile */}
      {isMobile && isNavbarOpen && (
        <div
          className="overlay-navbar"
          onClick={() => setIsNavbarOpen(false)}
        ></div>
      )}

      <Tooltip
        id="tooltip-navbar"
        place="right"
        style={{
          maxWidth: "200px",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          zIndex: 2,
        }}
      />
    </>
  );
}

export default Navbar;
