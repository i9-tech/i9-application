import React, { useState } from "react";
import "./FiltrosEstoque.css";
import { useNavigate } from "react-router-dom";

function FiltrosEstoque({ onAdicionarProduto, filtroStatus, setFiltroStatus }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const limparFiltro = () => setFiltroStatus(null);

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  return (
    <>
      <div className="top-actions-prod">
        <input type="text" placeholder="Procurar Produto" className="search" />

        <div className="filtros-dropdown-prod">
          <button className="filtro-prod" onClick={() => setMenuAberto(!menuAberto)}>
            🔍 Filtros
          </button>

          {menuAberto && (
            <div className="menu-filtros-prod">
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
          <button className="filtro-ativo-prod" onClick={limparFiltro}>
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

        <button
          className="add-btn-prod"
          onClick={() => {
            navigate("/estoque/formulario-produtos");
          }}
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          + Adicionar Produto
        </button>
      </div>
    </>
  );
}

export default FiltrosEstoque;
