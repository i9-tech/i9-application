import React from "react";
import ReactApexChart from "react-apexcharts";
import "../Grafico.css";

export default function Barras({ dados }) {
  const categorias = dados.map((item) => item.nome);
  const quantidades = dados.map((item) => item.quantidade);
  const maxY = Math.max(...quantidades) + 10;

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
      selection: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) =>
        val.toLocaleString("pt-BR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      offsetY: -22,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: categorias,
      position: "bottom",
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
        formatter: (val) => {
          const partes = String(val).split(" ");
          return partes[partes.length - 1];
        },
      },
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: maxY,
      forceNiceScale: false,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        formatter: (val) =>
          val.toLocaleString("pt-BR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }),
        style: {
          fontSize: "12px",
          colors: "#444",
        },
      },
    },
    grid: {
      yaxis: { lines: { show: false } },
      padding: { right: 0 },
    },
    tooltip: {
      enabled: true,
      x: { formatter: (val) => val },
    },
  };

  const series = [
    {
      name: "Unidades",
      data: quantidades,
    },
  ];

  return (
    <div className="grafico-wrapper">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
}
