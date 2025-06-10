import React from "react";
import { corrigirDataISO } from "../../../utils/utils";
import iconeCheck from "../../../assets/check.svg";

export default function ComandaHeader({
  numeroPedido,
  dataHora,
  concluirTodos,
  isCheckboxMarcadas,
  setIsCheckboxMarcadas,
}) {
  return (
    <>
      <div className="cabecalho-conteudo">
        <div>
          <h3>Pedido #{numeroPedido}</h3>
          <p>{corrigirDataISO(dataHora)}</p>
        </div>
        <div className="cabecalho-concluir">
          <button
            className="cabecalho-botao"
            onClick={() => {
              const novoEstadoCheckbox = !isCheckboxMarcadas;
              setIsCheckboxMarcadas(novoEstadoCheckbox);
              concluirTodos(novoEstadoCheckbox);
            }}
          >
            <img src={iconeCheck} />
            {isCheckboxMarcadas ? "Desmarcar " : "Marcar "}Todos
          </button>
        </div>
      </div>
    </>
  );
}
