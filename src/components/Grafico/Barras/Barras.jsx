import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../Grafico.css";
import CarregamentoBarras from "./CarregamentoBarras";
import NoData from "../NoData";

export default function Barras({ dados }) {
  const categorias = dados.map((item) => item.nome);
  const quantidades = dados.map((item) => item.quantidadeVendida);
  const maxY = Math.max(...quantidades) + 1;
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
          const partes = String(val).split(" ")[0];
          return partes;
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

  if (aguardandoDados && !timeoutAtingido) {
    return <CarregamentoBarras />;
  }

  if (timeoutAtingido && (!dados || dados.length === 0)) {
    return <NoData/>;
  }

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
