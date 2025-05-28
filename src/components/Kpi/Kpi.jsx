import React from "react";
import "./Kpi.css";

export default function Kpi(props) {
  return (
    <div className="kpi" style={{ "--indicador-color": props.indicador }}>
      <div className="kpi-container">
        <span className="titulo-kpi">{props.titulo}</span>
        <h2 className="valor-kpi">{props.valor}</h2>
        <p className="adicional-kpi">{props.adicional}</p>
      </div>
    </div>
  );
}
