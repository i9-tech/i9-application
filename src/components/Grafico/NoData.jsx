import React from 'react';
import './Grafico.css';

export default function NoData() {
  return (
    <div className="no-data-wrapper">
      <p className="no-data-text">Nenhum dado disponível para exibir o gráfico no momento.</p>
    </div>
  );
}
