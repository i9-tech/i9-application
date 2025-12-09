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
import { getFiltrosProdutos } from "../../utils/filters";

export function Estoque() {
  const token = localStorage.getItem("token");
  const funcionario = getFuncionario();
  const [termoBusca, setTermoBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [resumo, setResumo] = useState([{}]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const filtros = getFiltrosProdutos();
  const [setorSelecionado, setSetorSelecionado] = useState(filtros.setor);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    filtros.categoria
  );
  const [filtroStatus, setFiltroStatus] = useState(filtros.status);

  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [pagina, setPagina] = useState(filtros.pagina);
  const [quantidadePorPagina, setQuantidadePorPagina] = useState(
    filtros.quantidadePorPagina
  );
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [ordem] = useState("asc");

  const buscarProdutos = useCallback(() => {
    setIsLoadingData(true);
    const termoSemAcento = (termoBusca || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    api
      .get(`${ENDPOINTS.PRODUTOS_PAGINADO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          pagina,
          quantidadePorPagina,
          ordem,
          termoBusca: termoSemAcento,
          statusEstoque: filtroStatus,
          setorId: setorSelecionado ? Number(setorSelecionado) : undefined,
          categoriaId: categoriaSelecionada
            ? Number(categoriaSelecionada)
            : undefined,
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
  }, [
    funcionario.userId,
    token,
    pagina,
    quantidadePorPagina,
    ordem,
    termoBusca,
    filtroStatus,
    setorSelecionado,
    categoriaSelecionada,
  ]);

  const buscarQuantidadeProdutos = useCallback(() => {
    api
      .get(`${ENDPOINTS.PRODUTOS_QUANTIDADE_DIFERENTE}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuantidadeTotalProdutos(res.data))
      .catch((err) =>
        console.error("Erro ao buscar quantidade de pratos:", err)
      );
  }, [funcionario.userId, token]);

  useEffect(() => {
    buscarQuantidadeProdutos();
  }, [buscarQuantidadeProdutos]);

  useEffect(() => {
    setPagina(pagina);
  }, [termoBusca, filtroStatus, setorSelecionado, categoriaSelecionada]);

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
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            setorSelecionado={setorSelecionado}
            setSetorSelecionado={setSetorSelecionado}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            pagina={pagina}
            quantidadePorPagina={quantidadePorPagina}
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
           <div className="paginacao-wrapper">
                    <Paginacao
                    pagina={pagina}
                    totalPaginas={totalPaginas}
                    quantidadePorPagina={quantidadePorPagina}
                    onChangePagina={(novaPagina) => setPagina(novaPagina)}
                    onChangeQuantidadePorPagina={(novaQtd) => setQuantidadePorPagina(novaQtd)}
                  />
                  </div>
        </div>
      </LayoutTela>
    </>
  );
}

export default Estoque;
