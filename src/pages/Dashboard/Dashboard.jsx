import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import iconeDev from "../../assets/dev-icone.svg";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Kpi from "../../components/Kpi/Kpi";
import Grafico from "../../components/Grafico/Grafico";
import Ranking from "../../components/Ranking/Ranking";
import Barras from "../../components/Grafico/Barras/Barras";
import Resumo from "../../components/Ranking/Resumo/Resumo";
import Donut from "../../components/Grafico/Donut/Donut";

export function Dashboard() {
  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  // JSON com pratos
  const pratos = [
    { nome: "Feijoada", quantidade: 43 },
    { nome: "Frango à Parmegiana", quantidade: 31 },
    { nome: "Lasanha", quantidade: 40 },
    { nome: "Estrogonofe", quantidade: 11 },
    { nome: "Escondidinho", quantidade: 40 },
    { nome: "Moqueca", quantidade: 36 },
    { nome: "Salada Caeser", quantidade: 32 },
  ];

  // JSON com produtos
  const produtos = [
    { nome: "Água", quantidade: 15 },
    { nome: "Bolinho Ana Maria", quantidade: 22 },
    { nome: "Salgadinho", quantidade: 30 },
    { nome: "Açúcar", quantidade: 10 },
    { nome: "Café", quantidade: 18 },
    { nome: "Óleo", quantidade: 25 },
    { nome: "Sal", quantidade: 12 },
  ];

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

  // JSON com categorias
  const categorias = [
    { categoria: "Hortifrúti", quantidade: 180, valor: 2500 },
    { categoria: "Bebidas", quantidade: 220, valor: 3100 },
    { categoria: "Laticínios e Frios", quantidade: 150, valor: 2800 },
    { categoria: "Mercearia Seca", quantidade: 300, valor: 4500 },
    { categoria: "Congelados", quantidade: 90, valor: 1900 },
  ];

  return (
    <>
      <LayoutTela titulo="Dashboard" adicional={diaAtual}>
        <article className="dashboard">
          <section className="kpis">
            <Kpi
              key={"abss"}
              titulo={"Lucro Bruto"}
              valor={"R$ 500,00"}
              adicional={"+R$ 150,00 em relação ao dia anterior"}
              indicador={"#8280FF"}
            />
            <Kpi
              key={"abssss"}
              titulo={"Lucro Liquido"}
              valor={"R$ 350,00"}
              adicional={"R$ 250,00 em mercadorias"}
              indicador={"#FEC53D"}
            />
            <Kpi
              key={"absdass"}
              titulo={"Quantidade de Vendas"}
              valor={"200 vendas"}
              adicional={"+15 em relação ao dia anterior"}
              indicador={"#4AD991"}
            />
            <Kpi
              key={"abssdasdas"}
              titulo={"Prato Mais Vendido"}
              valor={"Feijoada"}
              adicional={"43 unidades"}
              indicador={"#16FFD0"}
            />
          </section>
          <section className="graficos">
            <Grafico titulo={"Pratos mais Vendidos"}>
              <Barras dados={pratos} />
            </Grafico>
            <Grafico titulo={"Produtos mais Vendidos"}>
              <Barras dados={produtos} />
            </Grafico>
            <Ranking titulo={"Setores com Maiores Vendas"}>
              <Resumo dados={setores}></Resumo>
            </Ranking>
            <Grafico titulo={"Top 5 Categorias mais Vendidas"}>
              <Donut dados={categorias} />
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
