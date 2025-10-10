import "./Estoque.css";
import { useState, useEffect, useCallback } from "react";
import FiltrosEstoque from "../../components/EstoqueLista/FiltrosEstoque/FiltrosEstoque";
import { ResumoEstoque } from "../../components/EstoqueLista/ResumoEstoque/ResumoEstoque";
import TabelaEstoque from "../../components/EstoqueLista/TabelaEstoque/TabelaEstoque";
import { calcularResumoEstoque } from "./DadosProdutos/utilsEstoque";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario } from "../../utils/auth";
import { Paginacao } from "../../components/Paginacao/Paginacao";

export function Estoque() {
  const token = localStorage.getItem("token");
  const funcionario = getFuncionario();
  const [termoBusca, setTermoBusca] = useState("");
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const [filtros, setFiltros] = useState({ status: null, categoria: "", setor: "" })

  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [resumo, setResumo] = useState([{}]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [pagina, setPagina] = useState(0);
  const [quantidadePorPagina, setQuantidadePorPagina] = useState(5);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [ordem] = useState("asc");

  const buscarProdutos = useCallback(() => {
    setIsLoadingData(true);
    const termoSemAcento = (termoBusca || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    api
      .get(`${ENDPOINTS.PRODUTOS_PAGINADO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          pagina,
          quantidadePorPagina,
          ordem,
          termoBusca: termoSemAcento,
          statusEstoque: filtros.status,
          setorId: setorSelecionado ? Number(setorSelecionado) : undefined,
          categoriaId: categoriaSelecionada ? Number(categoriaSelecionada) : undefined
        },
      })
      .then((res) => {
        const page = res.data;
        setProdutos(page.content);
        setResumo(calcularResumoEstoque(page.content));
        setTotalPaginas(page.totalPages);
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
        setIsLoadingData(false);
      });
  }, [funcionario.userId, token, pagina, quantidadePorPagina, ordem, termoBusca, filtros.status, setorSelecionado, categoriaSelecionada]);

  const buscarQuantidadeProdutos = useCallback(() => {
    api
      .get(`${ENDPOINTS.PRODUTOS_QUANTIDADE_DIFERENTE}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuantidadeTotalProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar quantidade de pratos:", err));
  }, [funcionario.userId, token]);

  useEffect(() => {
    buscarQuantidadeProdutos();
  }, [buscarQuantidadeProdutos]);

  useEffect(() => {
    setPagina(0);
  }, [termoBusca, filtros.status, setorSelecionado, categoriaSelecionada]);

  useEffect(() => {
    buscarProdutos();
  }, [pagina, buscarProdutos]);

  return (
    <>
      <LayoutTela
        titulo="Estoque de Produtos"
        adicional={`${quantidadeTotalProdutos} itens cadastrados`}
      >
        <div className="estoque">
          <FiltrosEstoque
            filtros={filtros}
            setFiltros={setFiltros}
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            setorSelecionado={setorSelecionado}
            setSetorSelecionado={setSetorSelecionado}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
          />
          <ResumoEstoque {...resumo} />
          <TabelaEstoque
            isLoadingData={isLoadingData}
            produtos={produtos}
            filtros={filtros}
            termoBusca={termoBusca}
            setorSelecionado={setorSelecionado}
            categoriaSelecionada={categoriaSelecionada}
            buscarProdutos={buscarProdutos}
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
    </>
  );
}

export default Estoque;
