import React from "react";
import "./LayoutTela.css";
import Navbar from "../Navbar/Navbar";

export default function LayoutTela(props) {
  return (
    <>
      <Navbar />
      <section className="secao-layout">
        <div className="div-layout">
          <header className="header-layout">
            <span className="content-header-layout">
            <h1>{props.titulo ? props.titulo : "NOME DA SEÇÃO"}</h1>
            <span className="adicional-header">
            {props.adicional ? props.adicional : ""}
            </span>
            </span>
            <span className="adicional-header-right">
              {props.adicionalUm ? props.adicionalUm : ""}
            </span>
          </header>
          <main className="main-layout">
            {props.children ? props.children : "ADICIONE SEU CONTEÚDO"}
          </main>
        </div>
      </section>
    </>
  );
}
