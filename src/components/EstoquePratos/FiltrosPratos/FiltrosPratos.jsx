import React, { useState, useEffect, useCallback } from "react";
import api from "../../../provider/api";
import "./FiltrosPratos.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario } from "../../../utils/auth";
import { toast } from "react-toastify";
import Select from "react-select";
import ModalArea from "../../CadastroArea/ModalArea";

function FiltrosPratos({
  setFiltros,
  termoBusca,
  setTermoBusca,
  setorSelecionado,
  setSetorSelecionado,
  categoriaSelecionada,
  setCategoriaSelecionada,
  areaSelecionada,
  setAreaSelecionada,
}) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [areas, setAreas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading] = useState(false);

  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");

  const atualizarFiltros = useCallback(() => {
    setFiltros({
      status: filtroStatus,
      categoria: categoriaSelecionada,
      setor: setorSelecionado,
      area: areaSelecionada,
    });
  }, [
    filtroStatus,
    categoriaSelecionada,
    setorSelecionado,
    areaSelecionada,
    setFiltros,
  ]);

  const aplicarFiltro = (tipo) => {
    setFiltroStatus(tipo);
    setMenuAberto(false);
  };

  const limparFiltroStatus = () => {
    setFiltroStatus(null);
  };

  useEffect(() => {
    if (!funcionario.userId) return;

    api
      .get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => Array.isArray(res.data) && setSetores(res.data))
      .catch((err) => {
        console.error("Erro ao buscar setores:", err);
        toast.error("Erro ao buscar setores!");
      });

    api
      .get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => Array.isArray(res.data) && setCategorias(res.data))
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao buscar categorias!");
      });

    api
      .get(`${ENDPOINTS.AREA_PREPARO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => Array.isArray(res.data) && setAreas(res.data))
      .catch((err) => {
        console.error("Erro ao buscar áreas:", err);
        toast.error("Erro ao buscar áreas!");
      });
  }, [funcionario.userId, token]);

  useEffect(() => {
    atualizarFiltros();
  }, [atualizarFiltros]);

  const optionsSetores = [
    { value: "", label: "Todos Setores" },
    ...setores.map((set) => ({ value: set.id, label: set.nome })),
  ];
  const optionsCategorias = [
    { value: "", label: "Todas Categorias" },
    ...categorias.map((cat) => ({ value: cat.id, label: cat.nome })),
  ];
  const optionsAreas = [
    { value: "", label: "Todas Áreas" },
    ...areas.map((area) => ({ value: area.id, label: area.nome })),
  ];

  return (
    <div className="top-actions">
      <input
        type="text"
        placeholder="Procurar Prato"
        className="search"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      <div className="filtros-dropdown">
        {!filtroStatus && (
          <button className="filtro" onClick={() => setMenuAberto(!menuAberto)}>
            🔍 Filtros
          </button>
        )}
        {menuAberto && !filtroStatus && (
          <div className="menu-filtros">
            <button onClick={() => aplicarFiltro("disponível")}>
              ✅ Ativos
            </button>
            <button onClick={() => aplicarFiltro("indisponível")}>
              🚫 Inativos
            </button>
          </div>
        )}
      </div>

      {filtroStatus && (
        <button className="filtro-ativo" onClick={limparFiltroStatus}>
          {filtroStatus === "disponível"
            ? "✅ Disponíveis ✕"
            : "🚫 Indisponíveis ✕"}
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
              ? "var(--cor-para-o-texto-branco)"
              : "transparent",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": { borderColor: "transparent" },
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "var(--titulos-botoes-destaques)"
              : state.isFocused
              ? "var(--cinza-hover-select)"
              : "var(--cor-para-o-texto-branco)",
            color: state.isSelected
              ? "var(--cor-para-o-texto-branco)"
              : "var(--cor-para-texto-preto)",
            padding: "8px 16px",
            cursor: "pointer",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
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
              ? "var(--cor-para-o-texto-branco)"
              : "transparent",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": { borderColor: "transparent" },
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "var(--titulos-botoes-destaques)"
              : state.isFocused
              ? "var(--cinza-hover-select)"
              : "var(--cor-para-o-texto-branco)",
            color: state.isSelected
              ? "var(--cor-para-o-texto-branco)"
              : "var(--cor-para-texto-preto)",
            padding: "8px 16px",
            cursor: "pointer",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
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
        value={optionsAreas.find((opt) => opt.value === areaSelecionada)}
        onChange={(opt) => setAreaSelecionada(opt.value)}
        options={optionsAreas}
        placeholder="Todas Áreas"
        isSearchable={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: 200,
            maxWidth: 250,
            borderColor: state.isFocused
              ? "var(--cor-para-o-texto-branco)"
              : "transparent",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": { borderColor: "transparent" },
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "var(--titulos-botoes-destaques)"
              : state.isFocused
              ? "var(--cinza-hover-select)"
              : "var(--cor-para-o-texto-branco)",
            color: state.isSelected
              ? "var(--cor-para-o-texto-branco)"
              : "var(--cor-para-texto-preto)",
            padding: "8px 16px",
            cursor: "pointer",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
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
        onClick={() => setModalOpen(true)}
        style={{ color: "#fff", fontWeight: "bold" }}
      >
        + Adicionar Área
      </button>
      <button
        className="add-btn"
        onClick={() => navigate("/pratos/formulario-pratos")}
        style={{ color: "#fff", fontWeight: "bold" }}
      >
        + Adicionar Prato
      </button>

      <ModalArea
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        dados={areas}
        setDados={setAreas}
        isLoadingData={loading}
      />
    </div>
  );
}

export default FiltrosPratos;