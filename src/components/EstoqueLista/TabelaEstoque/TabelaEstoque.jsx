import CabecalhoEstoque from "./CabecalhoEstoque/CabecalhoEstoque";
import ProdutoEstoque from "./ProdutoEstoque/ProdutoEstoque";
import "./TabelaEstoque.css";

const TabelaEstoque = ({ produtos, setProdutos, filtroStatus }) => {

  const hoje = new Date();

  const produtosFiltrados = filtroStatus
    ? produtos.filter((p) => {
        if (filtroStatus === 'sem') return p.estoque === 0;
        if (filtroStatus === 'baixo') return p.estoque <= 10 && p.estoque > 0;
        if (filtroStatus === 'validade') {
          const [d, m, a] = p.validade.split('/');
          const validade = new Date(`${a}-${m}-${d}`);
          return (validade - hoje) / (1000 * 60 * 60 * 24) <= 30 && p.estoque > 0;
        }
        return true;
      })
    : produtos;

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja excluir este produto?");
    if (confirm) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (produto) => {
    alert(`Editar produto: ${produto.nome}\n(ID: ${produto.id})`);
  };

  return (
    <div className="tabela-container-prod">
      <table className="tabela-estoque-prod">
        <CabecalhoEstoque />
        <tbody>
          {produtosFiltrados.map((produto) => (
            <ProdutoEstoque
              key={produto.id}
              produto={produto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaEstoque;
