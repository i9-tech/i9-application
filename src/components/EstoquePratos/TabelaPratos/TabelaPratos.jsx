import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({ pratos, filtros, buscarPratos = {} }) => {
  const { status, categoria, setor } = filtros;

  const pratosFiltrados = pratos.filter((p) => {
    if (status) {
      if (status === "disponível" && !p.disponivel) return false;
      if (status === "indisponível" && p.disponivel) return false;
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
                buscar={buscarPratos}
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
