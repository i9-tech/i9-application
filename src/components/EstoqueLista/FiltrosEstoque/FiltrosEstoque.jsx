import React, { useState, useEffect } from "react";
import api from "../../../provider/api";
import "./FiltrosEstoque.css"
import { getFuncionario } from "../../../utils/auth";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";


function FiltrosEstoque({ filtroStatus, setFiltroStatus, termoBusca, setTermoBusca, setorSelecionado, setSetorSelecionado }) {
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const limparFiltro = () => setFiltroStatus(null);

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  const [setores, setSetores] = useState([]);

  useEffect(() => {
    api.get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSetores(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar setores:", err);
        toast.error("Erro ao buscar setores!");
      });
  }, []);

  return (
    <>
      <div className="top-actions-prod">
        <input
          type="text"
          placeholder="Procurar Produto"
          className="search"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />

        <div className="filtros-dropdown-prod">
          <button className="filtro-prod" onClick={() => setMenuAberto(!menuAberto)}>
            🔍 Filtros
          </button>

          {menuAberto && (
            <div className="menu-filtros-prod">
              <button onClick={() => aplicarFiltro("baixo")}>
                ⚠️ Estoque Baixo
              </button>
              <button onClick={() => aplicarFiltro("sem")}>
                ❌ Sem Estoque
              </button>
            </div>
          )}
        </div>

        {filtroStatus && (
          <button className="filtro-ativo-prod" onClick={limparFiltro}>
            {filtroStatus === "baixo" && "⚠️ Estoque Baixo ✕"}
            {filtroStatus === "sem" && "❌ Sem Estoque ✕"}
          </button>
        )}

        <select
          value={setorSelecionado}
          onChange={(e) => setSetorSelecionado(e.target.value)}
        >
          <option value="">Todos Setores</option>
          {setores.map((set) => (
            <option key={set.id} value={set.id}>
              {set.nome}
            </option>
          ))}
        </select>


        <button
          className="add-btn-prod"
          onClick={() => {
            navigate(ROUTERS.FORMULARIO_PRODUTOS);
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
