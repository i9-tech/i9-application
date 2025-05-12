import React from "react";
import "./ResumoEstoque.css";

export function ResumoEstoque({
  valorEstoque = 0,
  valorVenda = 0,
  lucroPrevisto = 0,
  estoqueBaixo = 0,
  semEstoque = 0,
  // pertoValidade = 0,
  totalEmEstoque = 0,
}) {
  return (
    <>
      <div className="resumo-bloco-prod">
        <div className="resumo-container-prod">
          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {valorEstoque.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label-prod">Valor total do Estoque</span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {valorVenda.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label-prod">Valor estimado de venda</span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {lucroPrevisto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <span className="resumo-label-prod">Lucro bruto esperado</span>
          </div>
        </div>

        <div className="resumo-kpi-bloco-prod">
          <div className="kpi-linha-prod">
            <div className="kpi-coluna-prod">
              <span className="resumo-valor-prod">
                <span className="bolinha-prod amarela" />
                {estoqueBaixo}
              </span>
              <span className="resumo-label-prod">Estoque Baixo</span>
            </div>

            <div className="kpi-coluna-prod">
              <span className="resumo-valor-prod">
                <span className="bolinha-prod vermelha" />
                {semEstoque}
              </span>
              <span className="resumo-label-prod">Sem Estoque</span>
            </div>

            {/* <div className="kpi-coluna">
              <span className="resumo-valor">
                <span className="bolinha laranja" />
                {pertoValidade}
              </span>
              <span className="resumo-label">Perto da Validade</span>
            </div> */}

            <div className="kpi-coluna-prod">
              <span className="resumo-valor-prod">
                <span className="bolinha-prod verde" />
                {totalEmEstoque}
              </span>
              <span className="resumo-label-prod">Em Estoque</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
