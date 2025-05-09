import React, { useState } from "react";
import "./FiltrosPratos.css"; // Você pode renomear o CSS depois, se quiser

function FiltrosPratos({ onAdicionarPrato, filtroStatus, setFiltroStatus }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const limparFiltro = () => setFiltroStatus(null);

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  return (
    <div className="top-actions">
      <input type="text" placeholder="Procurar Prato" className="search" />

      <div className="filtros-dropdown">
        <button className="filtro" onClick={() => setMenuAberto(!menuAberto)}>
          🔍 Filtros
        </button>

        {menuAberto && (
          <div className="menu-filtros">
            <button onClick={() => aplicarFiltro("ativo")}>✅ Ativos</button>
            <button onClick={() => aplicarFiltro("inativo")}>🚫 Inativos</button>
          </div>
        )}
      </div>

      {filtroStatus && (
        <button className="filtro-ativo" onClick={limparFiltro}>
          {filtroStatus === "ativo" && "✅ Ativos ✕"}
          {filtroStatus === "inativo" && "🚫 Inativos ✕"}
        </button>
      )}

      <select className="select-categoria">
        <option>Categoria do Prato</option>
        <option>Entrada</option>
        <option>Prato Principal</option>
        <option>Sobremesa</option>
        <option>Bebida</option>
      </select>

      <button
        className="add-btn"
        onClick={onAdicionarPrato}
        style={{ color: "#fff", fontWeight: "bold" }}
      >
        + Adicionar Prato
      </button>
    </div>
  );
}

export default FiltrosPratos;
