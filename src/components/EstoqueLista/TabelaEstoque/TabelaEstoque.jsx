import { Tooltip } from "react-tooltip";
import CabecalhoEstoque from "./CabecalhoEstoque/CabecalhoEstoque";
import ProdutoEstoque from "./ProdutoEstoque/ProdutoEstoque";
import "./TabelaEstoque.css";
import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";

const TabelaEstoque = ({
  isLoadingData,
  produtos,
  termoBusca,
  buscarProdutos,
  setorSelecionado,
  categoriaSelecionada,
}) => {

  function removeAccents(str = "") {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  const produtosFiltrados = (produtos ?? []).filter((p) => {
    // Filtro por nome
    if (
      termoBusca &&
      !removeAccents(p?.nome || "").toLowerCase().includes(removeAccents(termoBusca).toLowerCase())
    ) {
      return false;
    }

    // Filtro por categoria
    if (categoriaSelecionada && categoriaSelecionada !== "") {
      const categoriaId = p.categoria?.id ?? p.categoria;
      if (String(categoriaId) !== String(categoriaSelecionada)) return false;
    }

    // Filtro por setor
    if (setorSelecionado && setorSelecionado !== "") {
      const setorId = p.setor?.id ?? p.setor;
      if (String(setorId) !== String(setorSelecionado)) return false;
    }

    return true;
  });


  return (
    <div className="tabela-container-prod">
      <table className="tabela-estoque-prod">
        <CabecalhoEstoque />
        <tbody>
          {isLoadingData ? (
            <CarregamentoEstoque colunas={9} temImagem={true} />
          ) : produtosFiltrados.length > 0 ? (
            [...produtosFiltrados].map((produto) => (
              <ProdutoEstoque
                key={produto.id}
                produto={produto}
                buscar={buscarProdutos}
              />
            ))
          ) : (
            <NoDataEstoque tipo="produto" />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaEstoque;
