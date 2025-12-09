import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../Grafico.css";
import CarregamentoDonuts from "./CarregamentoDonuts";
import NoData from "../NoData";

export default function Donut({ dados }) {
  const categorias = dados.map((item) => item.nomeCategoria);
  const valores = dados.map((item) => item.totalVendido);
  const [aguardandoDados, setAguardandoDados] = useState(true);
  const [timeoutAtingido, setTimeoutAtingido] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutAtingido(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (dados && dados.length > 0) {
      setAguardandoDados(false);
    }
  }, [dados]);

  const formatarMoeda = (valor) => {
    const numero = Number(valor);
    
    if (isNaN(numero) || numero === null) return "R$ 0,00";
    
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: categorias,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) =>
                formatarMoeda(
                  (w?.globals?.seriesTotals || []).reduce((a, b) => a + b, 0)
                ),
            },
            value: {
              show: true,
              formatter: function (val) {
                return formatarMoeda(val);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (_val, opts) =>
        formatarMoeda(opts.w.globals.series[opts.seriesIndex]),
      style: {
        fontSize: "12px",
        fontWeight: 100,
        colors: ["#000"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: true,
      position: "left",
      horizontalAlign: "left",
      fontSize: "13px",
      fontWeight: "normal",
      labels: {
        colors: "#000",
      },
      itemMargin: {
        horizontal: 15,
        vertical: 10,
      },
      offsetX: 10,
      offsetY: 0,
    },
    tooltip: {
      y: {
        formatter: formatarMoeda,
      },
    },
  };

  if (aguardandoDados && !timeoutAtingido) {
    return <CarregamentoDonuts />;
  }

  if (timeoutAtingido && (!dados || dados.length === 0)) {
    return <NoData />;
  }

  return (
    <div className="grafico-wrapper">
      <ReactApexChart
        key={JSON.stringify(valores)}
        options={options}
        series={valores}
        type="donut"
        height="100%"
        style={{ marginRight: "-60px" }}
      />
    </div>
  );
}
