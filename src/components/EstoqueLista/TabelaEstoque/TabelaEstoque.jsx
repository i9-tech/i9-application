import { Tooltip } from "react-tooltip";
import CabecalhoEstoque from "./CabecalhoEstoque/CabecalhoEstoque";
import ProdutoEstoque from "./ProdutoEstoque/ProdutoEstoque";
import "./TabelaEstoque.css";

const TabelaEstoque = ({ produtos, setProdutos, filtroStatus, buscarProdutos }) => {

  const produtosFiltrados = filtroStatus
    ? produtos.filter((p) => {
        if (filtroStatus === 'sem') return p.quantidade === 0;
        if (filtroStatus === 'baixo') return p.quantidade <= p.quantidadeMin && p.quantidade > 0;
        return true;
      })
    : produtos;

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
        style={{ whiteSpace: "pre-line", zIndex: 2}}
      />
    </div>
  );
};

export default TabelaEstoque;
