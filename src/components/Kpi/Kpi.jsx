import React from "react";
import "./Kpi.css";

export default function Kpi(props) {
  return (
    <div
      onClick={props.onClick}
      className="kpi"
      style={{
        "--indicador-color": props.indicador,
        ...(props.cursor && { cursor: props.cursor }),
      }}
    >
      <div className="kpi-container">
        <span className="titulo-kpi">{props.titulo}</span>
        <h2 title={props.nome} className="valor-kpi">{props.valor}</h2>
        <p className="adicional-kpi">{props.adicional}</p>
      </div>
    </div>
  );
}
