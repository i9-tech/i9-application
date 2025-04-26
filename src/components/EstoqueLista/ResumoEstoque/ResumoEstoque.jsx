import React from "react";
import "./ResumoEstoque.css";

export function ResumoEstoque({
  valorEstoque = 0,
  lucroPrevisto = 0,
  estoqueBaixo = 0,
  semEstoque = 0,
  // pertoValidade = 0,
  totalEmEstoque = 0,
}) {
  return (
    <>
      <div className="resumo-bloco">
        <div className="resumo-container">
          <div className="resumo-item">
            <span className="resumo-valor">
              {valorEstoque.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label">Valor em Estoque</span>
          </div>

          <div className="resumo-item">
            <span className="resumo-valor">
              {lucroPrevisto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <span className="resumo-label">Lucro Previsto</span>
          </div>
        </div>

        <div className="resumo-kpi-bloco">
          <div className="kpi-linha">
            <div className="kpi-coluna">
              <span className="resumo-valor">
                <span className="bolinha amarela" />
                {estoqueBaixo}
              </span>
              <span className="resumo-label">Estoque Baixo</span>
            </div>

            <div className="kpi-coluna">
              <span className="resumo-valor">
                <span className="bolinha vermelha" />
                {semEstoque}
              </span>
              <span className="resumo-label">Sem Estoque</span>
            </div>

            {/* <div className="kpi-coluna">
              <span className="resumo-valor">
                <span className="bolinha laranja" />
                {pertoValidade}
              </span>
              <span className="resumo-label">Perto da Validade</span>
            </div> */}

            <div className="kpi-coluna">
              <span className="resumo-valor">
                <span className="bolinha verde" />
                {totalEmEstoque}
              </span>
              <span className="resumo-label">Em Estoque</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
