import { useState, useEffect } from "react";
import "./ResumoPratos.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import { FiHelpCircle } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import { ROUTERS } from "../../../utils/routers";


export function ResumoPratos({
  pratosAtivos = 0,
  pratosInativos = 0,
  totalPratos = 0,
}) {
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");


  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [valorTotalEstoqueAtivosInativos, setValorTotalEstoqueAtivosInativos] = useState(0);


  useEffect(() => {
    if (!funcionario) return;

    api
      .get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_LUCRO_BRUTO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setValorTotalEstoque(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar valor de venda do estoque de pratos:", err);
        toast.error("Erro ao buscar valor de venda do estoque de pratos!");
      });

    api
      .get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_TOTAL_PRECO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setValorTotalEstoqueAtivosInativos(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar valor de venda do estoque de pratos de produtos inativos e ativos:", err);
        toast.error("Erro ao buscar valor de venda do estoque de pratos!");
      });
  }, [funcionario, token]);

  
  return (
    <div className="resumo-bloco">
      <div className="resumo-container">
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotalEstoqueAtivosInativos.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <FiHelpCircle className="icone-ajuda"
              data-tooltip-id="tooltip"
              data-tooltip-content="Soma do valor de venda de todos os pratos em estoque."
            />
          </span>
          <span className="resumo-label">Lucro Total (Ativos e Inativos)</span>
        </div>
        
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotalEstoque.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <FiHelpCircle className="icone-ajuda"
              data-tooltip-id="tooltip"
              data-tooltip-content="Soma do valor de venda de todos os pratos ativos em estoque."
            />
          </span>
          <span className="resumo-label">Lucro (Ativos)</span>
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
        </div>
      </div>
    </div>
  );
}
