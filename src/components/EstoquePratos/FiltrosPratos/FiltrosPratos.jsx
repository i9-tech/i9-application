import { useState, useEffect } from "react";
import api from "../../../provider/api";
import "./FiltrosPratos.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import Select from "react-select";


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

    const optionsSetores = [
    { value: "", label: "Todos Setores" },
    ...setores.map((set) => ({
      value: set.id,
      label: set.nome,
    })),
  ];

  const optionsCategorias = [
    { value: "", label: "Todas Categorias" },
    ...categorias.map((cat) => ({
      value: cat.id,
      label: cat.nome,
    })),
  ];

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

      <Select
          value={optionsSetores.find((opt) => opt.value === setorSelecionado)}
          onChange={(opt) => setSetorSelecionado(opt.value)}
          options={optionsSetores}
          placeholder="Todos Setores"
          isSearchable={false}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              minWidth: 200,
              maxWidth: 250,
              borderColor: state.isFocused
                ? "var(--cor-para-o-texto-branco)" // cor da borda quando focado
                : "transparent",
              boxShadow: "none",
              "&:hover": { borderColor: "transparent" }, // cor do hover
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "var(--cor-para-texto-preto)", // ajuste para igualar a cor ao singleValue
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected
                ? "var(--titulos-botoes-destaques)" // cor do item selecionado
                : state.isFocused
                ? "var(--cinza-hover-select)" // cor do hover
                : "var(--cor-para-o-texto-branco)", // cor padrão
              color: state.isSelected
                ? "var(--cor-para-o-texto-branco)"
                : "var(--cor-para-texto-preto)", // cor do texto
              padding: 14,
              cursor: "pointer",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "var(--cor-para-texto-preto)", // cor do texto selecionado
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: 200,
              overflowY: "auto",
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 5,
              marginTop: 0,
            }),
          }}
        />

        <Select
          value={optionsCategorias.find(
            (opt) => opt.value === categoriaSelecionada
          )}
          onChange={(opt) => setCategoriaSelecionada(opt.value)}
          options={optionsCategorias}
          placeholder="Todas Categorias"
          isSearchable={false}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              minWidth: 200,
              maxWidth: 250,
              borderColor: state.isFocused
                ? "var(--cor-para-o-texto-branco)" // cor da borda quando focado
                : "transparent",
              boxShadow: "none",
              "&:hover": { borderColor: "transparent" }, // cor do hover
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected
                ? "var(--titulos-botoes-destaques)" // cor do item selecionado
                : state.isFocused
                ? "var(--cinza-hover-select)" // cor do hover
                : "var(--cor-para-o-texto-branco)", // cor padrão
              color: state.isSelected
                ? "var(--cor-para-o-texto-branco)"
                : "var(--cor-para-texto-preto)", // cor do texto
              padding: 14,
              cursor: "pointer",
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "var(--cor-para-texto-preto)", // ajuste para igualar a cor ao singleValue
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "var(--cor-para-texto-preto)", // cor do texto selecionado
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: 200,
              overflowY: "auto",
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 5,
              marginTop: 0,
            }),
          }}
        />



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
