import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({ pratos, buscarPratos, filtros, termoBusca, setorSelecionado, categoriaSelecionada }) => {
  const { status } = filtros;

  const pratosFiltrados = pratos.filter((p) => {
    // Filtro por nome
    if (termoBusca && !p.nome?.toLowerCase().includes(termoBusca.toLowerCase())) {
      return false;
    }

    // Filtro por status
    if (status === "disponível" && !p.disponivel) return false;
    if (status === "indisponível" && p.disponivel) return false;

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
              <td
                colSpan="9"
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "#888",
                  fontSize: "1.1rem",
                  background: "#fff",
                }}>
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
