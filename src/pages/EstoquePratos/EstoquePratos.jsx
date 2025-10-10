import "./EstoquePratos.css";
import { useEffect, useState, useCallback } from "react";
import FiltrosPratos from "../../components/EstoquePratos/FiltrosPratos/FiltrosPratos";
import { ResumoPratos } from "../../components/EstoquePratos/ResumoPratos/ResumoPratos";
import TabelaPratos from "../../components/EstoquePratos/TabelaPratos/TabelaPratos";
import { calcularResumoPratos } from "./DadosPratos/utilsPratos";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario, getToken } from "../../utils/auth";
import { Paginacao } from "../../components/Paginacao/Paginacao";

export function EstoquePratos() {
  const token = getToken();
  const funcionario = getFuncionario();
  const [termoBusca, setTermoBusca] = useState("");
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [filtros, setFiltros] = useState({ status: null, categoria: "", setor: "" });
  const [quantidadeTotalPratos, setQuantidadeTotalPratos] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [pratos, setPratos] = useState([]);
  const [resumo, setResumo] = useState([{}]);

  const [pagina, setPagina] = useState(0);
  const [quantidadePorPagina, setQuantidadePorPagina] = useState(5);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [ordem] = useState("asc");

  const buscarPratos = useCallback(() => {
    setIsLoadingData(true);
    const termoSemAcento = (termoBusca || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    api
      .get(`${ENDPOINTS.PRATOS_PAGINADO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          pagina,
          quantidadePorPagina,
          ordem,
          termoBusca: termoSemAcento,
          disponivel: filtros.status === "disponível" ? true : filtros.status === "indisponível" ? false : undefined,
          setorId: setorSelecionado ? Number(setorSelecionado) : undefined,
          categoriaId: categoriaSelecionada ? Number(categoriaSelecionada) : undefined

        },
      })
      .then((res) => {
        const page = res.data;
        setPratos(page.content);
        setResumo(calcularResumoPratos(page.content));
        setTotalPaginas(page.totalPages);
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
        setIsLoadingData(false);
      });
  }, [funcionario.userId, token, pagina, quantidadePorPagina, ordem, termoBusca, setorSelecionado, categoriaSelecionada, filtros.status]);


  const buscarQuantidadePratos = useCallback(() => {
    api
      .get(`${ENDPOINTS.PRATOS_QUANTIDADE}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuantidadeTotalPratos(res.data))
      .catch((err) => console.error("Erro ao buscar quantidade de pratos:", err));
  }, [funcionario.userId, token]);

  useEffect(() => {
    buscarQuantidadePratos();
  }, [buscarQuantidadePratos]);

  useEffect(() => {
    setPagina(0);
  }, [termoBusca, filtros.status, setorSelecionado, categoriaSelecionada]);

  useEffect(() => {
    buscarPratos();
  }, [pagina, buscarPratos]);

  return (
    <LayoutTela titulo="Estoque de Pratos" adicional={`${quantidadeTotalPratos} itens cadastrados`}>
      <div className="estoque">
        <FiltrosPratos
          filtros={filtros}
          setFiltros={setFiltros}
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          setorSelecionado={setorSelecionado}
          setSetorSelecionado={setSetorSelecionado}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        <ResumoPratos {...resumo} />
        <TabelaPratos
          isLoadingData={isLoadingData}
          pratos={pratos}
          filtros={filtros}
          buscarPratos={buscarPratos}
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          setorSelecionado={setorSelecionado}
          setSetorSelecionado={setSetorSelecionado}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        <Paginacao
          pagina={pagina}
          totalPaginas={totalPaginas}
          quantidadePorPagina={quantidadePorPagina}
          onChangePagina={(novaPagina) => setPagina(novaPagina)}
          onChangeQuantidadePorPagina={(novaQtd) => setQuantidadePorPagina(novaQtd)}
        />
      </div>
    </LayoutTela>
  );
}

export default EstoquePratos;
