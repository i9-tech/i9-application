import { useEffect, useState } from "react";
import "../Ranking.css";
import NoData from "../../Grafico/NoData";

export default function Resumo({ dados }) {
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

  if (timeoutAtingido && (!dados || dados.length === 0)) {
    return <NoData />;
  }

  if (aguardandoDados) {
    return (
      <div className="carregamento-ranking-container">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="linha-ranking-carregamento"></div>
        ))}
      </div>
    );
  }

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
