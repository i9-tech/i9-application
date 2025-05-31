import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../Grafico.css";
import CarregamentoDonuts from "./CarregamentoDonuts";
import NoData from "../NoData";

export default function Donut({ dados }) {
  const categorias = dados.map((item) => item.nomeCategoria);
  const valores = dados.map((item) => item.quantidadeVendida);
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

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: categorias,
    plotOptions: {
      pie: {
        dataLabels: {
          offset: 22,
        },
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) =>
                (w?.globals?.seriesTotals || [])
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (_val, opts) =>
        opts.w.globals.series[opts.seriesIndex].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
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
        formatter: (val) =>
          val.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }),
      },
    },
  };

  if (aguardandoDados && !timeoutAtingido) {
      return <CarregamentoDonuts />;
    }
  
    if (timeoutAtingido && (!dados || dados.length === 0)) {
      return <NoData/>;
    }

  return (
    <div className="grafico-wrapper">
      <ReactApexChart
        options={options}
        series={valores}
        type="donut"
        height="100%"
        style={{ marginRight: "-60px" }}
      />
    </div>
  );
}
