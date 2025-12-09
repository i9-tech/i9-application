import { useState, useEffect } from "react";
import "./ResumoPratos.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import { FiHelpCircle } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import { ROUTERS } from "../../../utils/routers";

export function ResumoPratos() {
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");

  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [valorTotalEstoqueAtivosInativos, setValorTotalEstoqueAtivosInativos] = useState(0);

  const [pratosAtivos, setPratosAtivos] = useState(0);
  const [pratosInativos, setPratosInativos] = useState(0);
  const [totalPratos, setTotalPratos] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [totalSetores, setTotalSetores] = useState(0);

  useEffect(() => {
    if (!funcionario) return;

    // Quantidade de pratos ativos
    api.get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_ATIVO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPratosAtivos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar pratos ativos:", err);
        toast.error("Erro ao buscar pratos ativos!");
      });

    // Quantidade de pratos inativos
    api.get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_INATIVOS}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPratosInativos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar pratos inativos:", err);
        toast.error("Erro ao buscar pratos inativos!");
      });

    // Quantidade total de pratos
    api.get(`${ENDPOINTS.PRATOS_QUANTIDADE}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTotalPratos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar total de pratos:", err);
        toast.error("Erro ao buscar total de pratos!");
      });

    // Quantidade total de setores estoque de prato
    api.get(`${ENDPOINTS.PRATOS_QUANTIDADE_SETORES}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTotalSetores(res.data))
      .catch((err) => {
        console.error("Erro ao buscar total de setores:", err);
        toast.error("Erro ao buscar total de setores!");
      });

    // Quantidade total de categoria estoque de prato
    api.get(`${ENDPOINTS.PRATOS_QUANTIDADE_CATEGORIA}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTotalCategorias(res.data))
      .catch((err) => {
        console.error("Erro ao buscar total de categoria:", err);
        toast.error("Erro ao buscar total de categoria!");
      });

    // Lucro pratos ativos
    api.get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_LUCRO_BRUTO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setValorTotalEstoque(res.data))
      .catch((err) => {
        console.error("Erro ao buscar valor de venda dos pratos ativos:", err);
        toast.error("Erro ao buscar valor de venda dos pratos ativos!");
      });

    // Lucro total (ativos + inativos)
    api.get(`${ROUTERS.ESTOQUE_PRATOS}${ENDPOINTS.PRATOS_TOTAL_PRECO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setValorTotalEstoqueAtivosInativos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar valor de venda dos pratos total:", err);
        toast.error("Erro ao buscar valor de venda dos pratos total!");
      });

  }, [funcionario, token]);

  return (
    <div className="resumo-bloco">
      <div className="resumo-container">
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotalEstoqueAtivosInativos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            <FiHelpCircle className="icone-ajuda"
              data-tooltip-id="tooltip"
              data-tooltip-content="Soma do valor de venda de todos os pratos em estoque."
            />
          </span>
          <span className="resumo-label">Receita Total (Ativos e Inativos)</span>
        </div>
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotalEstoque.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            <FiHelpCircle className="icone-ajuda"
              data-tooltip-id="tooltip"
              data-tooltip-content="Soma do valor de venda de todos os pratos ativos em estoque."
            />
          </span>
          <span className="resumo-label">Receita (Ativos)</span>
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
              <span className="bolinha azul" />
              {totalSetores}
            </span>
            <span className="resumo-label">Total de Setores</span>
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
