import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";
import CabecalhoPratos from "./CabecalhoPratos/CabecalhoPratos";
import PratoEstoque from "./PratoEstoque/PratoEstoque";
import "./TabelaPratos.css";

const TabelaPratos = ({
  isLoadingData,
  pratos,
  buscarPratos,
  filtros,
  termoBusca,
  setorSelecionado,
  categoriaSelecionada,
}) => {
  const { status } = filtros;

  const pratosFiltrados = pratos.filter((p) => {
    // Filtro por nome
    if (
      termoBusca &&
      !removeAccents(p.nome || "").toLowerCase().includes(removeAccents(termoBusca).toLowerCase())
    ) {
      return false;
    }

    function removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
          {isLoadingData ? (
            <CarregamentoEstoque colunas={9} />
          ) : pratosFiltrados.length > 0 ? (
            pratosFiltrados.map((prato) => (
              <PratoEstoque
                key={prato.id}
                prato={prato}
                buscar={buscarPratos}
              />
            ))
          ) : (
            <NoDataEstoque tipo="prato" />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaPratos;
