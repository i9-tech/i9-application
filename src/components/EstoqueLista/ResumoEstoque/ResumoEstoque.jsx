
import "./ResumoEstoque.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import { FiHelpCircle } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";

export function ResumoEstoque() {
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");

  const [quantidadeProdutosEmEstoque, setQuantidadeTotalProdutosEmEstoque] = useState(0);
  const [valorEstoque, setValorEstoque] = useState(0);
  const [lucroBruto, setLucroBruto] = useState(0);
  const [lucroLiquido, setLucroLiquido] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [semEstoque, setSemEstoque] = useState(0);

  useEffect(() => {
    if (!funcionario) return;
    api.get(`${ENDPOINTS.PRODUTOS_QUANTIDADE_ESTOQUE}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setQuantidadeTotalProdutosEmEstoque(res.data))
      .catch((err) => {
        console.error("Erro ao buscar quantidade de produtos em estoque:", err);
        toast.error("Erro ao buscar quantidade de produtos em estoque!");

      });

    api.get(`${ENDPOINTS.PRODUTOS_COMPRA}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setValorEstoque(res.data))
      .catch((err) => {
        console.error("Erro ao buscar valor de compra de produtos em estoque:", err);
        toast.error("Erro ao buscar valor de compra de produtos!");
      });

         api.get(`${ENDPOINTS.PRODUTOS_LUCRO_BRUTO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setLucroBruto(res.data))
      .catch((err) => {
        console.error("Erro ao buscar lucro bruto de produtos em estoque:", err);
        toast.error("Erro ao buscar lucro bruto de produtos em estoque!");
      });

         api.get(`${ENDPOINTS.PRODUTOS_LUCRO_LIQUIDO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setLucroLiquido(res.data))
      .catch((err) => {
        console.error("Erro ao buscar lucro liquido de produtos em estoque:", err);
        toast.error("Erro ao buscar lucro liquido de produtos em estoque!");
      });
      

    api.get(`${ENDPOINTS.PRODUTOS_ESTOQUE_BAIXO}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setEstoqueBaixo(res.data))
      .catch((err) => {
        console.error("Erro ao buscar quantidade estoque baixos produtos em estoque:", err);
        toast.error("Erro ao buscar quantidade estoque baixos produtos em estoque!");
      });

    api.get(`${ENDPOINTS.PRODUTOS_SEM_ESTOQUE}/${funcionario.userId}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setSemEstoque(res.data))
      .catch((err) => {
        console.error("Erro ao buscar quantidade de produtos sem estoque:", err);
        toast.error("Erro ao buscar quantidade de produtos sem estoque!");
      });


  }, [funcionario, token]);

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
              Receita Estimada
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
              Lucro Bruto
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
                {quantidadeProdutosEmEstoque}
              </span>
              <span className="resumo-label-prod">Em Estoque</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
