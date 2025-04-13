import "./BotaoOpcao.css";

export function BotaoOpcao({ texto, onClick, selecionado }) {
  return (
    <button
      className={`botao-opcao ${selecionado ? "selecionado" : ""}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default BotaoOpcao;
