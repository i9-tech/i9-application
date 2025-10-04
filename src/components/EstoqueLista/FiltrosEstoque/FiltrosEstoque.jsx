import { useState, useEffect } from "react";
import api from "../../../provider/api";
import "./FiltrosEstoque.css"
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";

function FiltrosEstoque({ setFiltros, termoBusca, setTermoBusca, setorSelecionado, setSetorSelecionado, categoriaSelecionada, setCategoriaSelecionada }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  const limparFiltroStatus = () => {
    setFiltroStatus(null);
    setFiltros({
      status: null,
      categoria: categoriaSelecionada,
      setor: setorSelecionado,
    });
  };

  useEffect(() => {
    api.get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
      headers: { Authorization: `Bearer ${token}` },
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

    api.get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao buscar categorias!");
      });
  }, [funcionario.userId, token]);

  useEffect(() => {
    setFiltros({
      status: filtroStatus,
      categoria: categoriaSelecionada,
      setor: setorSelecionado,
    });
  }, [filtroStatus, categoriaSelecionada, setorSelecionado, setFiltros]);

  return (
    <div className="top-actions">
      <input
        type="text"
        placeholder="Procurar Produto"
        className="search"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      <div className="filtros-dropdown">
        <button className="filtro" onClick={() => setMenuAberto(!menuAberto)}>
          🔍 Filtros
        </button>

        {menuAberto && (
          <div className="menu-filtros">
            <button onClick={() => aplicarFiltro("sem")}>❌ Sem Estoque</button>
            <button onClick={() => aplicarFiltro("baixo")}>⚠️ Estoque Baixo</button>
            <button onClick={() => aplicarFiltro("em_estoque")}>📦 Em Estoque</button>
          </div>
        )}
      </div>

      {filtroStatus && (
        <button className="filtro-ativo" onClick={limparFiltroStatus}>
          {filtroStatus === "sem" && "❌ Sem Estoque ✕"}
          {filtroStatus === "baixo" && "⚠️ Estoque Baixo ✕"}
          {filtroStatus === "em_estoque" && "📦 Em Estoque ✕"}
        </button>
      )}

      <select
        className="select-categoria"
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

      <select
        className="select-categoria"
        value={categoriaSelecionada}
        onChange={(e) => setCategoriaSelecionada(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
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
    
  );
}

export default FiltrosEstoque;
