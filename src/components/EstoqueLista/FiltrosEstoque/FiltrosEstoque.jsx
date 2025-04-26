import React, { useState } from "react";
import "./FiltrosEstoque.css";

function FiltrosEstoque({ onAdicionarProduto, filtroStatus, setFiltroStatus }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const limparFiltro = () => setFiltroStatus(null);

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  return (
    <>
      <div className="top-actions">
        <input type="text" placeholder="Procurar Produto" className="search" />

        <div className="filtros-dropdown">
          <button className="filtro" onClick={() => setMenuAberto(!menuAberto)}>
            🔍 Filtros
          </button>

          {menuAberto && (
            <div className="menu-filtros">
              <button onClick={() => aplicarFiltro("sem")}>
                ❌ Sem Estoque
              </button>
              <button onClick={() => aplicarFiltro("baixo")}>
                ⚠️ Estoque Baixo
              </button>
              {/* <button onClick={() => aplicarFiltro("validade")}>
                💸 Perto da Validade
              </button> */}
            </div>
          )}
        </div>

        {filtroStatus && (
          <button className="filtro-ativo" onClick={limparFiltro}>
            {filtroStatus === "sem" && "❌ Sem Estoque ✕"}
            {filtroStatus === "baixo" && "⚠️ Estoque Baixo ✕"}
            {/* {filtroStatus === "validade" && "💸 Perto da Validade ✕"} */}
          </button>
        )}

        <select>
          <option>Selecione o setor</option>
          <option>Restaurante</option>
          <option>Pastelaria</option>
          <option>Mercado</option>
        </select>

        <button className="add-btn">Adicionar Produto</button>

        <button
          className="add-btn"
          onClick={onAdicionarProduto}
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default FiltrosEstoque;
