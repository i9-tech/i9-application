import React, { useEffect, useState } from "react";
import "./LayoutTela.css";
import Navbar from "../Navbar/Navbar";

export default function LayoutTela(props) {
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
      <Navbar />
      <section className="secao-layout">
        <div className="div-layout">
          <header className="header-layout">
            <div className="content-header-wrapper">
            <span className="content-header-layout">
              <h1 style={{ fontSize: isMobile ? "20px" : "28px" }}>
                {props.titulo ?? "NOME DA SEÇÃO"}
              </h1>
              <span className="adicional-header">{props.adicional ?? ""}</span>
            </span>
            {props.adicionalDois && (
              <span className="date-picker-top-right">
                {props.adicionalDois}
              </span>
            )}
</div>
            <span className="adicional-header-right">
              {props.adicionalUm ?? ""}
            </span>
          </header>

          <main className="main-layout">
            {props.children ?? "ADICIONE SEU CONTEÚDO"}
          </main>
        </div>
      </section>
    </>
  );
}
