import { Tooltip } from "react-tooltip";
import CabecalhoEstoque from "./CabecalhoEstoque/CabecalhoEstoque";
import ProdutoEstoque from "./ProdutoEstoque/ProdutoEstoque";
import "./TabelaEstoque.css";
import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";

const TabelaEstoque = ({
  isLoadingData,
  produtos,
  filtroStatus,
  termoBusca,
  buscarProdutos,
  setorSelecionado,
  categoriaSelecionada,
}) => {
  const listaProdutos = Array.isArray(produtos) ? produtos : [produtos];

  const produtosFiltrados = listaProdutos.filter((p) => {
    const normalize = (str) =>
      (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

    const nomeMatch = normalize(p.nome).includes(normalize(termoBusca));

    const statusMatch =
      !filtroStatus ||
      (filtroStatus === "sem" && p.quantidade === 0) ||
      (filtroStatus === "baixo" &&
        p.quantidade < p.quantidadeMin &&
        p.quantidade > 0);

    const setorMatch =
      !setorSelecionado || String(p.setor?.id) === String(setorSelecionado);

       const categoriaMatch =
      !categoriaSelecionada || String(p.categoria?.id) === String(categoriaSelecionada);

    return nomeMatch && statusMatch && setorMatch && categoriaMatch;
  });

  return (
    <div className="tabela-container-prod">
      <table className="tabela-estoque-prod">
        <CabecalhoEstoque />
        <tbody>
          {isLoadingData ? (
            <CarregamentoEstoque colunas={9} />
          ) : produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
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
