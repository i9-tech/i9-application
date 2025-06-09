
import "./ResumoEstoque.css";
import "react-toastify/dist/ReactToastify.css";
import { FiHelpCircle } from "react-icons/fi";


export function ResumoEstoque({
  valorEstoque = 0,
  lucroLiquido = 0,
  lucroBruto = 0,
  estoqueBaixo = 0,
  semEstoque = 0,
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
              <FiHelpCircle className="icone-ajuda"
                data-tooltip-id="tooltip"
                data-tooltip-content="Soma do valor de compra de todos os produtos em estoque."
              />
            </span>
            <span className="resumo-label-prod">
              Valor Total do Estoque
            </span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {lucroBruto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <FiHelpCircle className="icone-ajuda"
                data-tooltip-id="tooltip"
                data-tooltip-content="Soma do valor de venda de todos os produtos em estoque."
                />
            </span>
            <span className="resumo-label-prod">
              Lucro Bruto
            </span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {lucroLiquido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <FiHelpCircle className="icone-ajuda"
                data-tooltip-id="tooltip"
                data-tooltip-content="Diferença entre preço de venda e compra de todos os produtos. (Venda - Compra)." />

            </span>
            <span className="resumo-label-prod">
              Lucro Líquido Esperado
            </span>
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
