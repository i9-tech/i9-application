import { useState, useEffect } from "react";
import api from "../../../provider/api";
import "./FiltrosPratos.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";


function FiltrosPratos({ setFiltros, termoBusca, setTermoBusca, setorSelecionado, setSetorSelecionado, categoriaSelecionada, setCategoriaSelecionada }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");


  const atualizarFiltros = () => {
    setFiltros({
      status: filtroStatus,
      categoria: categoriaSelecionada,
      setor: setorSelecionado,
    });
  };



  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };


  const limparFiltroStatus = () => {
    setFiltroStatus(null);
    atualizarFiltros();
  }

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

    api.get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar categoria:", err);
        toast.error("Erro ao buscar categoria!");
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
      <input type="text" placeholder="Procurar Prato" className="search" value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)} />

      <div className="filtros-dropdown">
        <button className="filtro" onClick={() => setMenuAberto(!menuAberto)}>
          🔍 Filtros
        </button>

        {menuAberto && (
          <div className="menu-filtros">
            <button onClick={() => aplicarFiltro("disponível")}>✅ Disponíveis</button>
            <button onClick={() => aplicarFiltro("indisponível")}>🚫 Indisponíveis</button>
          </div>
        )}
      </div>

      {filtroStatus && (
        <button className="filtro-ativo" onClick={limparFiltroStatus}>
          {filtroStatus === "disponível" && "✅ Disponíveis ✕"}
          {filtroStatus === "indisponível" && "🚫 Indisponíveis ✕"}
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
      >        <option value="">Todas as Categorias</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>



      <button
        className="add-btn"
        onClick={() => navigate("/pratos/formulario-pratos")}
        style={{ color: "#fff", fontWeight: "bold" }}
      >
        + Adicionar Prato
      </button>
    </div>
  );
}

export default FiltrosPratos;
