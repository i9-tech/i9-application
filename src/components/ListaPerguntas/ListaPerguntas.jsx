export default function ListaPerguntas({
tipoPergunta, respostaPergunta, aberta, aoClicar, selecionado
}) {
  return (
    <>
      <span className={`pergunta ${selecionado ? 'selected' : ''}`}>
        <div className="tipo">{tipoPergunta}</div>
        <button className={`acionar ${selecionado ? 'selecao' : ''}`} onClick={aoClicar}>
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
