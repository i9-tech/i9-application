import React from "react";
import "../Ranking.css";

export default function Resumo({ dados }) {
  return (
    <table className="tabela-resumo">
      <thead>
        <tr>
          <th>Setor</th>
          <th>Quantidade Vendida</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            <td>{item.setor}</td>
            <td>{item.quantidade}</td>
            <td>
              {item.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
