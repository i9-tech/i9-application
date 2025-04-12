export default function ListaPerguntas({
tipoPergunta, respostaPergunta, aberta, aoClicar,
}) {
  return (
    <>
      <span className="pergunta">
        <div className="tipo">{tipoPergunta}</div>
        <button className="acionar" onClick={aoClicar}>
          +
        </button>
      </span>
      {aberta && (
        <div className="resposta" style={{ display: "flex" }}>
          {respostaPergunta}
        </div>
      )}
    </>
  );
}
