import { useState, useEffect } from "react";
import api from "../../../provider/api";
import "./FiltrosEstoque.css";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";
import Select from "react-select";
import LupaPesquisa from "../../../assets/lupa-pesquisa.svg";

function FiltrosEstoque({
  filtroStatus,
  setFiltroStatus,
  termoBusca,
  setTermoBusca,
  setorSelecionado,
  setSetorSelecionado,
  setCategoriaSelecionada,
  categoriaSeleciona,
}) {
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
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    api
      .get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
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

    api
      .get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
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
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao buscar categorias!");
      });
  }, [funcionario.userId, token]);

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
          <button
            className="filtro-prod"
            onClick={() => setMenuAberto(!menuAberto)}
          >
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
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
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
              padding: "8px 16px",
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
            (opt) => opt.value === categoriaSeleciona
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
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
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
              padding: "8px 16px",
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

        <button
          className="add-btn-prod"
          onClick={() => {
            navigate(ROUTERS.FORMULARIO_PRODUTOS);
          }}
          style={{
            color: "var(--cor-para-o-texto-branco)",
            fontWeight: "bold",
          }}
        >
          + Adicionar Produto
        </button>
      </div>
    </>
  );
}

export default FiltrosEstoque;
