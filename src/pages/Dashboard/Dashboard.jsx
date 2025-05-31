import "./Dashboard.css";
import iconeDev from "../../assets/dev-icone.svg";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Kpi from "../../components/Kpi/Kpi";
import Grafico from "../../components/Grafico/Grafico";
import Ranking from "../../components/Ranking/Ranking";
import Barras from "../../components/Grafico/Barras/Barras";
import Resumo from "../../components/Ranking/Resumo/Resumo";
import Donut from "../../components/Grafico/Donut/Donut";
import { useEffect, useState } from "react";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario, getToken } from "../../utils/auth";

export function Dashboard() {
  const funcionario = getFuncionario();
  const token = getToken();
  const [dadosPratos, setDadosPratos] = useState([]);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [dadosCategorias, setDadosCategorias] = useState([]);
  const [pratoMaisVendido, setPratoMaisVendido] = useState({});
  const [produtoMaisVendido, setProdutoMaisVendido] = useState({});
  const [quantidadeTotalVendida, setQuantidadeTotalVendida] = useState(0);
  const [valorTotalVendido, setValorTotalVendido] = useState(0);
  const [lucroLiquido, setLucroLiquido] = useState(0);

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [isKpiProduto, setIsKpiProduto] = useState(false);

  useEffect(() => {
      api
      .get(`${ENDPOINTS.VENDA_LIQUIDO_DIARIO}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLucroLiquido(res.data);
        console.log("Lucro Liquido recuperados: ", res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar Lucro Liquido: ", err);
      });

    api
      .get(`${ENDPOINTS.VENDA_TOP_PRATOS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDadosPratos(res.data);
        pratoMaisComprado(res.data);
        console.log("Pratos recuperados: ", res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar pratos: ", err);
      });

    api
      .get(`${ENDPOINTS.VENDA_TOP_PRODUTOS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDadosProdutos(res.data);
        produtoMaisComprado(res.data);
        console.log("Produtos recuperados: ", res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar produtos: ", err);
      });

    api
      .get(`${ENDPOINTS.VENDA_TOP_CATEGORIAS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDadosCategorias(res.data);
        console.log("Categorias recuperadas: ", res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar categorias: ", err);
      });

    api
      .get(
        `${ENDPOINTS.VENDA_ITENS_VENDIDOS_DIARIO}/${funcionario.empresaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("Vendas recuperadas: ", res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar vendas: ", err);
      });
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [dadosPratos, dadosProdutos]);

  const pratoMaisComprado = (pratos) => {
    const maisVendido = pratos.reduce((maior, atual) =>
      atual.quantidadeVendida > maior.quantidadeVendida ? atual : maior
    );
    setPratoMaisVendido(maisVendido);
  };

  const produtoMaisComprado = (produtos) => {
    const maisVendido = produtos.reduce((maior, atual) =>
      atual.quantidadeVendida > maior.quantidadeVendida ? atual : maior
    );
    setProdutoMaisVendido(maisVendido);
  };

  const calcularTotal = () => {
    const quantidadePratos = dadosPratos.reduce(
      (acc, item) => acc + item.quantidadeVendida,
      0
    );
    const quantidadeProdutos = dadosProdutos.reduce(
      (acc, item) => acc + item.quantidadeVendida,
      0
    );

    const valorPratos = dadosPratos.reduce(
      (acc, item) => acc + item.totalVendas,
      0
    );
    const valorProdutos = dadosProdutos.reduce(
      (acc, item) => acc + item.totalVendas,
      0
    );

    setQuantidadeTotalVendida(quantidadePratos + quantidadeProdutos);
    setValorTotalVendido(valorPratos + valorProdutos);
  };

  // JSON com setores
  const setores = [
    { setor: "Pratos", quantidade: 120, valor: 1200 },
    { setor: "Bebidas", quantidade: 80, valor: 800 },
    { setor: "Sobremesas", quantidade: 45, valor: 450 },
    { setor: "Saladas", quantidade: 60, valor: 600 },
    { setor: "Lanches", quantidade: 70, valor: 700 },
    { setor: "Cafés", quantidade: 50, valor: 500 },
    { setor: "Sucos", quantidade: 55, valor: 550 },
    { setor: "Entradas", quantidade: 40, valor: 400 },
    { setor: "Massas", quantidade: 30, valor: 300 },
    { setor: "Petiscos", quantidade: 35, valor: 350 },
  ];

  return (
    <>
      <LayoutTela titulo="Dashboard" adicional={diaAtual}>
        <article className="dashboard">
          <section className="kpis">
            <Kpi
              key={"abss"}
              titulo={"Lucro Bruto"}
              valor={`R$ ${valorTotalVendido}`}
              adicional={"+R$ 150,00 em relação ao dia anterior"}
              indicador={"#6f6df1"}
            />
            <Kpi
              key={"abssss"}
              titulo={"Lucro Liquido"}
              valor={`R$ ${lucroLiquido}`}
              adicional={"R$ 250,00 em mercadorias"}
              indicador={"#f0b731"}
            />
            <Kpi
              key={"absdass"}
              titulo={"Quantidade de Vendas"}
              valor={`${quantidadeTotalVendida} vendas`}
              adicional={"+15 em relação ao dia anterior"}
              indicador={"#41c482"}
            />
            <Kpi
              key={"abssdasdas"}
              titulo={` ${isKpiProduto ? "Produto" : "Prato"} Mais Vendido`}
              valor={
                isKpiProduto
                  ? produtoMaisVendido.nome?.split(" ")[0]
                  : pratoMaisVendido.nome?.split(" ")[0]
              }
              adicional={`${
                isKpiProduto
                  ? produtoMaisVendido.quantidadeVendida
                  : pratoMaisVendido.quantidadeVendida
              } unidades`}
              indicador={"#d35757"}
              cursor={"pointer"}
              onClick={() => {
                setIsKpiProduto(!isKpiProduto);
              }}
            />
          </section>
          <section className="graficos">
            <Grafico titulo={"Pratos mais Vendidos"}>
              <Barras dados={dadosPratos} />
            </Grafico>
            <Grafico titulo={"Produtos mais Vendidos"}>
              <Barras dados={dadosProdutos} />
            </Grafico>
            <Ranking titulo={"Setores com Maiores Vendas"}>
              <Resumo dados={setores}></Resumo>
            </Ranking>
            <Grafico titulo={"Top 5 Categorias mais Vendidas"}>
              <Donut dados={dadosCategorias} />
            </Grafico>
          </section>
        </article>
        {/* <Navbar />
      <div className='dashboard'>
        <img style={{width: '100px'}} src={iconeDev} alt="Icone de desenvolvimento" />
        <h1 style={{fontSize: '2rem'}}>DASHBOARD EM DESENVOLVIMENTO</h1>
        Por favor selecione uma página na navbar
      </div> */}
      </LayoutTela>
    </>
  );
}
