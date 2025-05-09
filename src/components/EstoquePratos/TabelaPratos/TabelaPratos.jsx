import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({ pratos, setPratos, filtroStatus }) => {

  const hoje = new Date();

  const pratosFiltrados = filtroStatus
    ? pratos.filter((p) => {
        if (filtroStatus === 'sem') return p.estoque === 0;
        if (filtroStatus === 'baixo') return p.estoque <= 10 && p.estoque > 0;
        if (filtroStatus === 'validade') {
          const [d, m, a] = p.validade.split('/');
          const validade = new Date(`${a}-${m}-${d}`);
          return (validade - hoje) / (1000 * 60 * 60 * 24) <= 30 && p.estoque > 0;
        }
        return true;
      })
    : pratos;

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja excluir este prato?");
    if (confirm) {
      setPratos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (prato) => {
    alert(`Editar prato: ${prato.nome}\n(ID: ${prato.id})`);
  };

  return (
    <div className="tabela-container">
      <table className="tabela-estoque">
        <CabecalhoPratos />
        <tbody>
          {pratosFiltrados.map((prato) => (
            <PratoEstoque  
              key={prato.id}
              prato={prato}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaPratos;
