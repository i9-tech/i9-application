import React, { useState, useEffect } from "react";
import "./ResumoEstoque.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiHelpCircle } from "react-icons/fi";


export function ResumoEstoque() {
  const token = localStorage.getItem("token");
  const funcionario = getFuncionario();

  const [lucroBruto, setLucroBruto] = useState(0);
  const [lucroLiquido, setLucroLiquido] = useState(0);
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [semEstoque, setSemEstoque] = useState(0);
  const [emEstoque, setEmEstoque] = useState(0);


  useEffect(() => {
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

    api
      .get(`${ENDPOINTS.PRODUTOS_LUBRO_BRUTO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setLucroBruto(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar lucro bruto do estoque:", err);
        toast.error("Erro ao buscar lucro bruto do estoque!");
      });

    api
      .get(`${ENDPOINTS.PRODUTOS_ESTOQUE_BAIXO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setEstoqueBaixo(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar quantidade de produtos em estoque baixo do estoque:", err);
        toast.error("Erro ao buscar quantidade de produtos em estoque baixo do estoque!");
      });

    api
      .get(`${ENDPOINTS.PRODUTOS_QUANTIDADE_ESTOQUE}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setEmEstoque(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar quantidade de produtos em estoque:", err);
        toast.error("Erro ao buscar quantidade de produtos em estoque!");
      });
  }, []);

  return (
    <>
      <div className="resumo-bloco-prod">
        <div className="resumo-container-prod">
          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {valorTotalEstoque.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label-prod">
              Valor total do Estoque
            </span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {lucroBruto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label-prod">Lucro bruto venda</span>
          </div>

          <div className="resumo-item-prod">
            <span className="resumo-valor-prod">
              {lucroLiquido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="resumo-label-prod">Lucro líquido esperado</span>
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
                {emEstoque}
              </span>
              <span className="resumo-label-prod">Em Estoque</span>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}
