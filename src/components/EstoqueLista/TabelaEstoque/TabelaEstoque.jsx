import { Tooltip } from "react-tooltip";
import CabecalhoEstoque from "./CabecalhoEstoque/CabecalhoEstoque";
import ProdutoEstoque from "./ProdutoEstoque/ProdutoEstoque";
import "./TabelaEstoque.css";

const TabelaEstoque = ({ produtos, setProdutos, filtroStatus, termoBusca, buscarProdutos }) => {

  const produtosFiltrados = produtos.filter((p) => {
    const nomeMatch = p.nome?.toLowerCase().includes(termoBusca?.toLowerCase() || "");

    const statusMatch =
      !filtroStatus ||
      (filtroStatus === "sem" && p.quantidade === 0) ||
      (filtroStatus === "baixo" && p.quantidade <= p.quantidadeMin && p.quantidade > 0);

    return nomeMatch && statusMatch;
  });



  return (
    <div className="tabela-container-prod">
      <table className="tabela-estoque-prod">
        <CabecalhoEstoque />
        <tbody>
          {produtosFiltrados.map((produto) => (
            <ProdutoEstoque
              key={produto.id}
              produto={produto}
              buscar={buscarProdutos}
            />
          )
          )}
        </tbody>
      </table>
      <Tooltip
        id="tooltip-quantidade"
        place="right"
        style={{ whiteSpace: "pre-line", zIndex: 2 }}
      />
    </div>
  );
};

export default TabelaEstoque;
