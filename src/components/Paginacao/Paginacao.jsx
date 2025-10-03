import "./Paginacao.css";

export function Paginacao({ pagina, totalPaginas, onChange }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i);

  return (
    <div className="paginacao">
      <button
        className="btn-nav"
        disabled={pagina === 0}
        onClick={() => onChange(pagina - 1)}
      >
        ◀
      </button>

      {paginas.map((p) => (
        <button
          key={p}
          className={`btn-page ${p === pagina ? "ativo" : ""}`}
          onClick={() => onChange(p)}
        >
          {p + 1}
        </button>
      ))}

      <button
        className="btn-nav"
        disabled={pagina + 1 >= totalPaginas}
        onClick={() => onChange(pagina + 1)}
      >
        ▶
      </button>
    </div>
  );
}