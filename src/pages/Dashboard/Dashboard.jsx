import "./Dashboard.css";
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
import { formatarMoeda } from "../../utils/utils";
import Relogio from "../../components/Relogio/Relogio";
import { LiaFileDownloadSolid } from "react-icons/lia";
import html2canvas from "html2canvas";
import { DateRangePicker } from "../../components/Calendario/DateRangePicker";

export function Dashboard() {
  const funcionario = getFuncionario();
  const token = getToken();
  const [dadosPratos, setDadosPratos] = useState([]);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [dadosCategorias, setDadosCategorias] = useState([]);
  const [pratoMaisVendido, setPratoMaisVendido] = useState({});
  const [produtoMaisVendido, setProdutoMaisVendido] = useState({});
  const [setores, setSetores] = useState([]);
  const [isDadosDisponiveis, setIsDadosDisponiveis] = useState(false);
  const [lucroBruto, setLucroBruto] = useState(0);
  const [diferencaBruto, setDiferencaBruto] = useState(0);
  const [isLucroMaior, setIsLucroMaior] = useState(false);
  const [lucroLiquido, setLucroLiquido] = useState(0);
  const [liquidoMercadoria, setLiquidoMercadoria] = useState(0);
  const [quantidadeTotalVendida, setQuantidadeTotalVendida] = useState(0);
  const [diferencaVenda, setDiferencaVenda] = useState(0);
  const [isVendaMaior, setIsVendaMaior] = useState(false);
  const [isKpiProduto, setIsKpiProduto] = useState(false);

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    api
      .get(`${ENDPOINTS.VENDA_KPIS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("Valores de KPI recuperados: ", res.data[0]);
        tratarKpis(res.data[0]);
      })
      .catch((err) => {
        console.log("Erro ao buscar valores de KPI: ", err);
      });

    api
      .get(`${ENDPOINTS.VENDA_TOP_PRATOS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDadosPratos(res.data);
        pratoMaisComprado(res.data);
        // console.log("Pratos recuperados: ", res.data);
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
        // console.log("Produtos recuperados: ", res.data);
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
      })
      .catch((err) => {
        console.log("Erro ao buscar categorias: ", err);
      });

    api
      .get(`${ENDPOINTS.VENDA_RANKING_SETORES}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const setoresFormatados = res.data.map(
          ({ nomeSetor, quantidadeVendida, valorTotal }) => ({
            setor: nomeSetor,
            quantidade: quantidadeVendida,
            valor: valorTotal,
          })
        );
        setSetores(setoresFormatados);
      })
      .catch((err) => {
        console.log("Erro ao buscar setores: ", err);
      });

    setIsDadosDisponiveis(true);
  }, [isDadosDisponiveis, token, funcionario.empresaId]);

  const tratarKpis = (kpi) => {
    if (!kpi) return;

    const lucroDiario = Number(kpi.lucroDiario ?? 0);
    const lucroDiarioOntem = Number(kpi.lucroDiarioOntem ?? 0);
    const lucroLiquidoDiario = Number(kpi.lucroLiquidoDiario ?? 0);
    const totalMercadoriaDiario = Number(kpi.totalMercadoriaDiario ?? 0);
    const vendasDiaria = Number(kpi.vendasDiaria ?? 0);
    console.log(kpi.vendasDiaria);
    console.log(kpi.vendasDiariaOntem);
    const vendasDiariaOntem = Number(kpi.vendasDiariaOntem ?? 0);

    const diferencaBruto = lucroDiario - lucroDiarioOntem;
    const diferencaVendas = vendasDiaria - vendasDiariaOntem;

    setLucroBruto(lucroDiario);
    setDiferencaBruto(diferencaBruto);
    setIsLucroMaior(diferencaBruto >= 0);

    setLucroLiquido(lucroLiquidoDiario);
    setLiquidoMercadoria(totalMercadoriaDiario);

    setQuantidadeTotalVendida(vendasDiaria);
    setDiferencaVenda(diferencaVendas);
    setIsVendaMaior(diferencaVendas >= 0);
  };

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

  const diaDash = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
  function baixarImagemDashboard() {
    const elemento = document.querySelector(".dashboard");
    if (!elemento) return;

    html2canvas(elemento, {
      backgroundColor: '#f0f0f0',
      scrollX: 0,
      scrollY: 0,
    }).then((originalCanvas) => {
      const margem = 24;
      const canvasComMargem = document.createElement("canvas");
      canvasComMargem.width = originalCanvas.width - 10;
      canvasComMargem.height = originalCanvas.height + margem * 2;

      const ctx = canvasComMargem.getContext("2d");

      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvasComMargem.width, canvasComMargem.height);

      ctx.drawImage(originalCanvas, margem, margem);

      const link = document.createElement("a");
      link.download = `dashboard(${diaDash}).png`;
      link.href = canvasComMargem.toDataURL("image/png");
      link.click();
    });
  }
  return (
    <>
      <LayoutTela
        titulo="Dashboard "
        adicional={
          <>
            {diaAtual} - <Relogio />
            <button
              onClick={baixarImagemDashboard}
              style={{
                marginLeft: "1rem",
                marginTop: "-0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "absolute"
              }}
              title="Baixar imagem da Dashboard"
            >
              <LiaFileDownloadSolid size={30} />
            </button>
          </>
        }
        adicionalUm={
            <div className="filtro-data">
        <DateRangePicker
          maxMonths={3}
          numberOfMonths={1}
          onChange={(range) => {
            console.log("Intervalo selecionado:", range)
          }}
        />
      </div>
        }
      >
        <article className="dashboard">
          <section className="kpis">
            <Kpi
              key={"abss"}
              titulo={"Lucro Bruto"}
              valor={formatarMoeda(lucroBruto)}
              adicional={`${isLucroMaior && diferencaBruto > 0
                ? "+"
                : diferencaBruto > 0
                  ? "-"
                  : ""
                }${formatarMoeda(diferencaBruto)} em relação ao dia anterior`}
              indicador={"#6f6df1"}
            />
            <Kpi
              key={"abssss"}
              titulo={"Lucro Liquido"}
              valor={formatarMoeda(lucroLiquido)}
              adicional={`${formatarMoeda(liquidoMercadoria)} em mercadorias`}
              indicador={"#f0b731"}
            />
            <Kpi
              key={"absdass"}
              titulo={"Vendas Realizadas"}
              valor={`${quantidadeTotalVendida || 0} venda${quantidadeTotalVendida !== 1 ? "s" : ""
                }`}
              adicional={`${isVendaMaior && diferencaVenda > 0
                ? "+"
                : diferencaVenda > 0
                  ? "-"
                  : ""
                }${diferencaVenda} em relação ao dia anterior`}
              indicador={"#41c482"}
            />
            <Kpi
              key={"abssdasdas"}
              titulo={` ${isKpiProduto ? "Produto" : "Prato"} Mais Vendido`}
              title={
                isKpiProduto
                  ? produtoMaisVendido.nome || "Nenhum"
                  : pratoMaisVendido.nome || "Nenhum"
              }
              valor={
                isKpiProduto
                  ? produtoMaisVendido.nome?.split(" ")[0] || "Nenhum"
                  : pratoMaisVendido.nome?.split(" ")[0] || "Nenhum"
              }
              nome={
                isKpiProduto
                  ? produtoMaisVendido.nome || "Nenhum"
                  : pratoMaisVendido.nome || "Nenhum"
              }
              adicional={`${isKpiProduto
                ? produtoMaisVendido.quantidadeVendida || 0
                : pratoMaisVendido.quantidadeVendida || 0
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
              <Resumo dados={setores} />
            </Ranking>
            <Grafico titulo={"Top 5 Categorias mais Vendidas"}>
              <Donut dados={dadosCategorias} />
            </Grafico>
          </section>
        </article>
      </LayoutTela >
    </>
  );
}
