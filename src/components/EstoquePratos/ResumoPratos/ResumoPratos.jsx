import React, { useState, useEffect } from "react";
import "./ResumoPratos.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";

export function ResumoPratos({
  pratosAtivos = 0,
  pratosInativos = 0,
  totalPratos = 0,
}) {
  const funcionario = getFuncionario();
  const token = funcionario?.token;

  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);

  useEffect(() => {
    if (!funcionario) return;

    api
      .get(`${ENDPOINTS.PRODUTOS_COMPRA}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setValorTotalEstoque(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar valor de compra do estoque:", err);
        toast.error("Erro ao buscar valor de compra do estoque!");
      });
  }, []);

  return (
    <div className="resumo-bloco">
      <div className="resumo-container">
        <div className="resumo-item">
          <span className="resumo-valor">
            {valorTotalEstoque.toLocaleString("pt-BR", {
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
        </div>
      </div>
    </div>
  );
}
