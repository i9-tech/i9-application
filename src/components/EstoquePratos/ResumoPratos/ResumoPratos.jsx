import React from "react";
import "./ResumoPratos.css";

export function ResumoPratos({
  valorTotal = 0,
  pratosAtivos = 0,
  pratosInativos = 0,
  totalPratos = 0,
  totalCategorias = 0
}) {
  return (
    <div className="resumo-bloco">
      <div className="resumo-container">
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="resumo-label">Soma dos Preços dos Pratos</span>
        </div>
      </div>

      <div className="resumo-kpi-bloco">
        <div className="kpi-linha">
          <div className="kpi-coluna">
            <span className="resumo-valor">
              <span className="bolinha verde" />
              {pratosAtivos}
            </span>
            <span className="resumo-label">Ativos</span>
          </div>

          <div className="kpi-coluna">
            <span className="resumo-valor">
              <span className="bolinha vermelha" />
              {pratosInativos}
            </span>
            <span className="resumo-label">Inativos</span>
          </div>

          <div className="kpi-coluna">
            <span className="resumo-valor">
              <span className="bolinha cinza" />
              {totalPratos}
            </span>
            <span className="resumo-label">Total de Pratos</span>
          </div>

          <div className="kpi-coluna">
            <span className="resumo-valor">
              <span className="bolinha amarela" />
              {totalCategorias}
            </span>
            <span className="resumo-label">Total de Categorias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
