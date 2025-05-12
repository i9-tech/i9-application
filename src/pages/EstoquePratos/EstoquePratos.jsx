import "./EstoquePratos.css";
import React, { useState } from "react";
import FiltrosPratos from "../../components/EstoquePratos/FiltrosPratos/FiltrosPratos";
import { ResumoPratos } from "../../components/EstoquePratos/ResumoPratos/ResumoPratos";
import TabelaPratos from "../../components/EstoquePratos/TabelaPratos/TabelaPratos";
import { calcularResumoPratos } from "./DadosPratos/utilsPratos";
import LayoutTela from "../../components/LayoutTela/LayoutTela";

export function EstoquePratos() {
  const [filtros, setFiltros] = useState({
    status: null,
    categoria: "",
    setor: "",
  });
  const [pratos] = useState([
    {
      id: "0001",
      nome: "Feijoada",
      descricao: "Feijoada completa com arroz e couve",
      imagem: "https://via.placeholder.com/80",
      categoria: "Prato Principal",
      setor: "Restaurante",
      preco: "R$ 25,00",
      ativo: true,
    },
    {
      id: "0002",
      nome: "Coxinha",
      descricao: "Coxinha de frango crocante",
      imagem: "https://via.placeholder.com/80",
      categoria: "Entrada",
      setor: "Lanchonete",
      preco: "R$ 5,50",
      ativo: true,
    },
    {
      id: "0003",
      nome: "Guaraná",
      descricao: "Refrigerante Guaraná 350ml",
      imagem: "https://via.placeholder.com/80",
      categoria: "Bebida",
      setor: "Pastelaria",
      preco: "R$ 12,00",
      ativo: false,
    },
    {
      id: "0004",
      nome: "Escondidinho",
      descricao: "Escondidinho de carne seca com purê de mandioca",
      imagem: "https://via.placeholder.com/80",
      categoria: "Prato Principal",
      setor: "Restaurante",
      preco: "R$ 18,90",
      ativo: true,
    },
    {
      id: "0005",
      nome: "Brigadeiro",
      descricao: "Docinho de chocolate tradicional",
      imagem: "https://via.placeholder.com/80",
      categoria: "Sobremesa",
      setor: "Lanchonete",
      preco: "R$ 3,00",
      ativo: false,
    },
  ]);

  const resumo = calcularResumoPratos(pratos);

  return (
    <LayoutTela titulo="Estoque de Pratos" adicional={`${pratos.length} itens cadastrados`}>
      <div className="estoque">
        <FiltrosPratos 
        filtros={filtros}
        setFiltros={setFiltros} />
        <ResumoPratos {...resumo} />
        <TabelaPratos 
        pratos={pratos} 
        filtros={filtros} />
      </div>
    </LayoutTela>
  );
}


export default EstoquePratos;
