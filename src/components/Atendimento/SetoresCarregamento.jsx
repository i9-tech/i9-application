import React from "react";
import "./CarregamentoAtendimento.css";

export default function SetoresCarregamento({quantidadeCards}) {
  return (
    <section className="setores-carregamento">
      <div className="container-setores-carregamento">
        {Array.from({ length: quantidadeCards }).map((_, index) => (
          <span key={index} className="card-setor-carregamento"></span>
        ))}
      </div>
    </section>
  );
}
