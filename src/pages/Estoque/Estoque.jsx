import "./Estoque.css";
import React, { useState, useRef, useEffect } from "react";
import FiltrosEstoque from "../../components/EstoqueLista/FiltrosEstoque/FiltrosEstoque";
import { ResumoEstoque } from "../../components/EstoqueLista/ResumoEstoque/ResumoEstoque";
import TabelaEstoque from "../../components/EstoqueLista/TabelaEstoque/TabelaEstoque";
import { calcularResumoEstoque } from "./DadosProdutos/utilsEstoque";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";

export function Estoque() {
  const hoje = new Date().toLocaleDateString("en-US");
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [produtos, setProdutos] = useState([{}]);
  const [resumo, setResumo] = useState([{}]);

  useEffect(() => {
    buscarProdutos();
  }, [produtos]);

  const buscarProdutos = () => {
    api
      .get("/produtos")
      .then((res) => {
        setProdutos(res.data);
        setResumo(calcularResumoEstoque(res.data));
      })
      .catch((err) => {
        console.error("Erro ao ao buscar produtos:", err);
      });
  };

  return (
    <>
      <LayoutTela
        titulo="Estoque de Produtos"
        adicional={`${produtos.length} itens cadastrados`}
      >
        <div className="estoque">
          <FiltrosEstoque
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
          />
          <ResumoEstoque {...resumo} />
          <TabelaEstoque
            produtos={produtos}
            filtroStatus={filtroStatus}
            buscarProdutos={buscarProdutos}
          />
        </div>
      </LayoutTela>
    </>
  );
}

export default Estoque;
