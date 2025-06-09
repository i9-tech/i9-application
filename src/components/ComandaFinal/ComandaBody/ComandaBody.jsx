import React from "react";
import CheckboxPedidoCozinha from "../../Botoes/CheckboxPedidoCozinha/CheckboxPedidoCozinha";
import { enviroments } from "../../../utils/enviroments";
import { imagemPadrao } from "../../../assets/imagemPadrao";

export default function ComandaBody({
  imagem,
  titulo,
  descricao,
  observacao,
  index,
  pedidoId,
  checkboxMarcada,
  aoClicarNaCheckbox,
}) {
  const checkboxId = `checkbox-${pedidoId}-${index}`;

  return (
    <div className="corpo-conteudo">
      <div className="imagem">
        <img
          src={imagem ? imagem + enviroments.tokenURL : imagemPadrao}
          alt=""
        />
      </div>
      <div className="itemInfo">
        <h4>{titulo}</h4>
        <p className="itemDescricao" title={descricao}>{descricao}</p>
        {observacao && (
          <p className="observacao">
            Observação: <span>{observacao}</span>
          </p>
        )}
      </div>
      <CheckboxPedidoCozinha
        id={checkboxId}
        checkboxParaMarcar={checkboxMarcada}
        checkarItem={aoClicarNaCheckbox}
      />
    </div>
  );
}
