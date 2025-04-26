import "./Estoque.css";
import React, { useState, useRef } from "react";
import { produtosMock } from "./DadosProdutos/produtosMock";
import { HeaderEstoque } from "../../components/EstoqueLista/HeaderEstoque/HeaderEstoque";
import FiltrosEstoque from "../../components/EstoqueLista/FiltrosEstoque/FiltrosEstoque";
import { ResumoEstoque } from "../../components/EstoqueLista/ResumoEstoque/ResumoEstoque";
import TabelaEstoque from "../../components/EstoqueLista/TabelaEstoque/TabelaEstoque";
import { calcularResumoEstoque } from "./DadosProdutos/utilsEstoque";
import Navbar from "../../components/Navbar/Navbar";

export function Estoque() {
  const [products, setProducts] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const resumo = calcularResumoEstoque(products);

  const gerarNovoId = () => {
    if (products.length === 0) return "0001";
    const ultimoId = products[products.length - 1].id;
    const numero = parseInt(ultimoId, 10) + 1;
    return String(numero).padStart(4, "0");
  };

  const handleAddProduct = () => {
    const aleatorio =
      produtosMock[Math.floor(Math.random() * produtosMock.length)];
    const novoProduto = {
      ...aleatorio,
      id: gerarNovoId(),
      nome: `${aleatorio.nome}`,
      registro: new Date().toLocaleDateString("pt-BR"),
    };
    setProducts((prev) => [...prev, novoProduto]);
  };

  return (
    <>
    <Navbar />
      <div className="estoque">
        <HeaderEstoque totalItens={products.length} />
        <FiltrosEstoque
          onAdicionarProduto={handleAddProduct}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
        <ResumoEstoque {...resumo} />
        <TabelaEstoque
          produtos={products}
          setProdutos={setProducts}
          filtroStatus={filtroStatus}
        />
      </div>
    </>
  );
}

export default Estoque;
