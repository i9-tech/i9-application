import React from "react";
import CheckboxCozinha from "../../Botoes/CheckboxCozinha/CheckboxCozinha";

export default function ComandaFooter({
  qtdItens,
  index,
  onCompletar,
  disabled,
  feito
}) {
  const checkboxId = `checkbox-footer-${index}`;

  const handleClick = () => {
    if (disabled) {
      alert(
        "Todos os itens devem ser marcados como prontos antes de finalizar o pedido."
      );
      return;
    }
    onCompletar();
  };

  return (
    <div className="rodape-conteudo">
      <p className="itensQtd">
        {qtdItens} {qtdItens === 1 ? "Item" : "Itens"}{" "}
      </p>
      <CheckboxCozinha
        id={checkboxId}
        texto="Completo"
        onClick={handleClick}
        disabled={disabled}
        ativo={!disabled}
        feito={feito}
      />
    </div>
  );
}
