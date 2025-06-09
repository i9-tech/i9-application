import React from "react";
import "./CarregamentoAtendimento.css";

export default function CardsAtendimentoCarregamento({quantidadeCards}) {
  return (
    <section className="cards-atendimento-carregamento">
      <div className="container-cards-atendimento-carregamento">
        <div className="titulo-cards-carregamento">
          <span className="titulo-carregamento"></span>
        </div>
        <div className="cards-produtos-carregamento">
          {Array.from({ length: quantidadeCards }).map((_, index) => (
            <span key={index} className="cards-carregamento"></span>
          ))}
        </div>
      </div>
    </section>
  );
}
