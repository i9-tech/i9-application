import React, { useState } from "react";
import "./FiltrosPratos.css"; 
import { useNavigate } from "react-router-dom";

function FiltrosPratos({ setFiltros }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [setor, setSetor] = useState("");


  const atualizarFiltros = () => {
    setFiltros({
      status: filtroStatus,
      categoria,
      setor,
    });
  };


  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    atualizarFiltros();
    setMenuAberto(false);
  };

  const limparFiltroStatus = () => {
    setFiltroStatus(null);
    atualizarFiltros();
  };

  const handleCategoriaChange = (e) => {
  const novaCategoria = e.target.value;
  setCategoria(novaCategoria);
  atualizarFiltros(filtroStatus, novaCategoria, setor); // usa o valor correto já aqui
};

const handleSetorChange = (e) => {
  const novoSetor = e.target.value;
  setSetor(novoSetor);
  atualizarFiltros(filtroStatus, categoria, novoSetor); // idem
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
        <button className="filtro-ativo" onClick={limparFiltroStatus}>
          {filtroStatus === "ativo" && "✅ Ativos ✕"}
          {filtroStatus === "inativo" && "🚫 Inativos ✕"}
        </button>
      )}

      <select className="select-categoria" onChange={handleCategoriaChange} value={categoria}>
        <option value="">Categoria do Prato</option>
        <option value="Entrada">Entrada</option>
        <option value="Prato Principal">Prato Principal</option>
        <option value="Sobremesa">Sobremesa</option>
        <option value="Bebida">Bebida</option>
      </select>

      <select className="select-categoria" onChange={handleSetorChange} value={setor}>
        <option value="">Setor Selecionado</option>
        <option value="Pastelaria">Pastelaria</option>
        <option value="Lanchonete">Lanchonete</option>
        <option value="Restaurante">Restaurante</option>
      </select>

      <button
        className="add-btn"
        onClick={() => navigate("/estoque-pratos/formulario-pratos")}
        style={{ color: "#fff", fontWeight: "bold" }}
      >
        + Adicionar Prato
      </button>
    </div>
  );
}

export default FiltrosPratos;
