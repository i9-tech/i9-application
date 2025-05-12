import "./Estoque.css";
import React, { useState, useRef } from "react";
import FiltrosEstoque from "../../components/EstoqueLista/FiltrosEstoque/FiltrosEstoque";
import { ResumoEstoque } from "../../components/EstoqueLista/ResumoEstoque/ResumoEstoque";
import TabelaEstoque from "../../components/EstoqueLista/TabelaEstoque/TabelaEstoque";
import { calcularResumoEstoque } from "./DadosProdutos/utilsEstoque";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import arroz from "../../assets/arroz.png";

export function Estoque() {
  const hoje = new Date().toLocaleDateString("pt-BR");
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [products] = useState([
    {
        id: "0001",
        nome: "Arroz Branco Tipo 1",
        validade: "12/07/2025",
        compra: "R$ 4,50",
        venda: "R$ 6,00",
        estoque: 100,
        registro: hoje,
        descricao:
          "Arroz branco tipo 1, grãos selecionados, ideal para o dia a dia.",
        imagem: arroz,
      },
      {
        id: "0002",
        nome: "Feijão Carioca",
        validade: "15/08/2025",
        compra: "R$ 5,00",
        venda: "R$ 6,50",
        estoque: 80,
        registro: hoje,
        descricao: "Feijão carioca de alta qualidade, saboroso e nutritivo.",
        imagem: "https://m.media-amazon.com/images/I/81J59dmdaCL._AC_UF894,1000_QL80_.jpg",
      },
      {
        id: "0003",
        nome: "Macarrão Espaguete",
        validade: "20/09/2025",
        compra: "R$ 2,00",
        venda: "R$ 3,00",
        estoque: 120,
        registro: hoje,
        descricao:
          "Macarrão espaguete de trigo duro, ideal para diversas receitas.",
        imagem: "https://supermercadopaisefilhos.loji.com.br/storage/uploads/yXXDDdE9t29UeEWyV38r2ChYxuNAMnBTjJQDEBma.jpg",
      },
      {
        id: "0004",
        nome: "Leite Integral 1L",
        validade: "10/05/2025",
        compra: "R$ 3,50",
        venda: "R$ 4,50",
        estoque: 200,
        registro: hoje,
        descricao: "Leite integral pasteurizado, fonte de cálcio e vitaminas.",
        imagem: "https://coopsantaclara.com.br/media/3509/1643806645_leite_uht_integral_edge.png",
      },
      {
        id: "0005",
        nome: "Óleo de Soja 900ml",
        validade: "25/06/2025",
        compra: "R$ 4,00",
        venda: "R$ 5,50",
        estoque: 150,
        registro: hoje,
        descricao:
          "Óleo de soja refinado, ideal para frituras e preparos diversos.",
        imagem: "https://www.soya.com.br/media/g3snj4cc/soja-v2-1.png?mode=max",
      },
      {
        id: "0006",
        nome: "Açúcar Refinado 1kg",
        validade: "30/07/2025",
        compra: "R$ 2,50",
        venda: "R$ 3,50",
        estoque: 90,
        registro: hoje,
        descricao: "Açúcar refinado de alta pureza, ideal para doces e bebidas.",
        imagem: "https://apoioentrega.vteximg.com.br/arquivos/ids/854930/7458_0.png?v=638595839695470000",
      },
      {
        id: "0007",
        nome: "Sal Refinado 1kg",
        validade: "15/08/2025",
        compra: "R$ 1,00",
        venda: "R$ 1,50",
        estoque: 110,
        registro: hoje,
        descricao: "Sal refinado iodado, essencial para o preparo de alimentos.",
        imagem: "https://s3-sa-east-1.amazonaws.com/loja2/a5f15966806726c6f865a08e5ab920db.png",
      },
      {
        id: "0008",
        nome: "Café Torrado e Moído 500g",
        validade: "20/09/2025",
        compra: "R$ 8,00",
        venda: "R$ 10,00",
        estoque: 70,
        registro: hoje,
        descricao: "Café torrado e moído, sabor intenso e aroma marcante.",
        imagem: "https://www.cafe3coracoes.com.br/wp-content/uploads/2020/12/tm-tradicional-01.png",
      },
      {
        id: "0009",
        nome: "Farinha de Trigo 1kg",
        validade: "10/10/2025",
        compra: "R$ 3,00",
        venda: "R$ 4,00",
        estoque: 130,
        registro: hoje,
        descricao: "Farinha de trigo enriquecida com ferro e ácido fólico.",
        imagem: "https://m.media-amazon.com/images/I/61IDVb04R7L._AC_SL1080_.jpg",
      },
      {
        id: "0010",
        nome: "Manteiga com Sal 200g",
        validade: "05/05/2025",
        compra: "R$ 5,00",
        venda: "R$ 6,50",
        estoque: 60,
        registro: hoje,
        descricao:
          "Manteiga com sal, sabor tradicional, ideal para pães e receitas.",
        imagem: "https://m.media-amazon.com/images/I/61l+I8jBCaL._AC_SL1280_.jpg",
      },
    
      {
        id: "0011",
        nome: "Achocolatado em Pó 550g",
        validade: "10/06/2025",
        compra: "R$ 5,00",
        venda: "R$ 7,00",
        estoque: 0,
        registro: new Date().toLocaleDateString("pt-BR"),
        descricao: "Achocolatado em pó, ideal para bebidas e receitas.",
        imagem: "https://m.media-amazon.com/images/I/81CN3Co1GFL._AC_SL1500_.jpg",
      },
      {
        id: "0012",
        nome: "Refrigerante Cola 2L",
        validade: "18/05/2025",
        compra: "R$ 4,00",
        venda: "R$ 6,50",
        estoque: 0,
        registro: new Date().toLocaleDateString("pt-BR"),
        descricao: "Refrigerante sabor cola, embalagem econômica de 2 litros.",
        imagem: "https://m.media-amazon.com/images/I/61kXj1PApLL._AC_SL1500_.jpg",
      },
      {
        id: "0013",
        nome: "Biscoito Recheado Chocolate",
        validade: "01/07/2025",
        compra: "R$ 2,00",
        venda: "R$ 3,00",
        estoque: 0,
        registro: new Date().toLocaleDateString("pt-BR"),
        descricao: "Biscoito recheado sabor chocolate, crocante e delicioso.",
        imagem: "https://m.media-amazon.com/images/I/714CKmrg3hL._AC_SL1500_.jpg",
      },
      {
        id: "0014",
        nome: "Iogurte Natural 170g",
        validade: "28/04/2025",
        compra: "R$ 1,50",
        venda: "R$ 2,50",
        estoque: 5,
        registro: new Date().toLocaleDateString("pt-BR"),
        descricao: "Iogurte natural, ideal para consumo direto ou receitas.",
        imagem: "https://m.media-amazon.com/images/I/61GNqIoWfRL._AC_SL1500_.jpg",
      }
  ]);
  const resumo = calcularResumoEstoque(products);

  return (
    <>
    <LayoutTela titulo="Estoque de Produtos" adicional={`${products.length} itens cadastrados`}>

      <div className="estoque">
        <FiltrosEstoque
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
        <ResumoEstoque {...resumo} />
        <TabelaEstoque
          produtos={products}
          filtroStatus={filtroStatus}
        />
      </div>
    </LayoutTela>

    </>
  );
}

export default Estoque;
