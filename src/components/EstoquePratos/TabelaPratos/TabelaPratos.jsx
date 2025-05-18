import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({ pratos, buscarPratos, filtros = {} }) => {
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
