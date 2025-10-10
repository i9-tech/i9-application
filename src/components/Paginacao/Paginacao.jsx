import "./Paginacao.css";

export function Paginacao({ pagina, totalPaginas, quantidadePorPagina, onChangePagina, onChangeQuantidadePorPagina }) {
  if (totalPaginas <= 1 && !quantidadePorPagina) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i);
  const opcoesQuantidade = [5, 10, 20, 50];

  return (
    <div className="paginacao">
      <div className="paginacao-controles">
        <button
          className="btn-nav"
          disabled={pagina === 0}
          onClick={() => onChangePagina(pagina - 1)}
        >
          ◀
        </button>

        {paginas.map((p) => (
          <button
            key={p}
            className={`btn-page ${p === pagina ? "ativo" : ""}`}
            onClick={() => onChangePagina(p)}
          >
            {p + 1}
          </button>
        ))}

        <button
          className="btn-nav"
          disabled={pagina + 1 >= totalPaginas}
          onClick={() => onChangePagina(pagina + 1)}
        >
          ▶
        </button>
      </div>

      <div className="select-por-pagina">
        <select
          id="qtdPagina"
          value={quantidadePorPagina}
          onChange={(e) => onChangeQuantidadePorPagina(Number(e.target.value))}
        >
          <option value="">Itens por Página</option>
          {opcoesQuantidade.map((qtd) => (
            <option key={qtd} value={qtd}>
              {qtd} Itens
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
