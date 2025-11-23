import React, { useEffect, useState } from "react";
import "./LayoutTelaCardapio.css";

export default function LayoutTelaCardapio(props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="secao-layout-cardapio">
        <div className="div-layout-cardapio">
          <header className="header-layout-cardapio">
            <div className="content-header-wrapper-cardapio">
            <span className="content-header-layout-cardapio">
              <h1 style={{ fontSize: isMobile ? "20px" : "28px" }}>
                {props.titulo ?? "NOME DA SEÇÃO"}
              </h1>
              <span className="adicional-header-cardapio">{props.adicional ?? ""}</span>
            </span>
            {props.adicionalDois && (
              <span className="date-picker-top-right-cardapio">
                {props.adicionalDois}
              </span>
            )}
</div>
            <span className="adicional-header-right-cardapio">
              {props.adicionalUm ?? ""}
            </span>
          </header>

          <main className="main-layout--cardapio">
            {props.children ?? "ADICIONE SEU CONTEÚDO"}
          </main>
        </div>
      </section>
    </>
  );
}
