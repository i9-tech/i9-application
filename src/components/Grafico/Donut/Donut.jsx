import React from "react";
import ReactApexChart from "react-apexcharts";
import "../Grafico.css";

export default function Donut({ dados }) {
  const categorias = dados.map((item) => item.categoria);
  const valores = dados.map((item) => item.valor);

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
                w.globals.seriesTotals
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
      show: true, // Mostrar ou esconder a legenda
      position: "left", // "top" | "bottom" | "left" | "right"
      horizontalAlign: "left", // "left" | "center" | "right"
      fontSize: "13px", // Tamanho da fonte
      fontWeight: "normal", // Peso da fonte
      labels: {
        colors: "#000", // Cor do texto
      },
      itemMargin: {
        horizontal: 15, // Espaçamento horizontal entre itens
        vertical: 10, // Espaçamento vertical entre itens
      },
      offsetX: 10, // Deslocamento horizontal da legenda
      offsetY: 0, // Deslocamento vertical da legenda
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
