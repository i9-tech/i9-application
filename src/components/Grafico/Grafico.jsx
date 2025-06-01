import React from "react";
import "./Grafico.css";

export default function Grafico(props) {
  return (
    <div className="grafico">
      <div className="grafico-container">
        <h1 className="grafico-titulo">{props.titulo}</h1>
        <div className="grafico-wrapper">{props.children}</div>
      </div>
    </div>
  );
}
