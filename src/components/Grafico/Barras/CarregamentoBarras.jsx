import React from "react";
import "../Grafico.css";

export default function CarregamentoBarras() {
  const quantidadeBarras = 7;

  return (
    <section className="carregamento-barras-container">
      <div className="carretamento-barras">
        <div className="dados-laterais-barras">
          {Array.from({ length: quantidadeBarras }).map((_, i) => (
            <span key={`lateral-${i}`} className="dado-barras"></span>
          ))}
        </div>
        <div className="dados-graficos-barras">
          {Array.from({ length: quantidadeBarras }).map((_, i) => (
            <div key={`grafico-${i}`} className="dado-barra">
              <span className="numero-barras">
                <p></p>
              </span>
              <span className="barra-barras">
                <p></p>
              </span>
              <span className="nome-barras">
                <p></p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
