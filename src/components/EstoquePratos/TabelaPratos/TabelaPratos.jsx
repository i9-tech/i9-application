import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({ pratos, filtros = {} }) => {
  const { status, categoria, setor } = filtros;

  const pratosFiltrados = pratos.filter((p) => {
    if (status) {
      if (status === "ativo" && !p.ativo) return false;
      if (status === "inativo" && p.ativo) return false;
    }
    if (categoria && categoria !== "" && p.categoria !== categoria) return false;
    if (setor && setor !== "" && p.setor !== setor) return false;

    return true;
  });

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir este prato?")) {
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
          {pratosFiltrados.length > 0 ? (
            pratosFiltrados.map((prato) => (
              <PratoEstoque
                key={prato.id}
                prato={prato}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">
                Nenhum prato encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default TabelaPratos;
