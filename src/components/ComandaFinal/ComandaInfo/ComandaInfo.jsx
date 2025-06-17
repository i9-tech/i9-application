import React from "react";

export default function ComandaInfo({ cliente, mesa, pagamento }) {
  return (
    <>
      <div className="pedidoCliente">
        <p className="info-pedidoCliente">
          <p>Cliente</p> <span title={cliente}>{cliente}</span>
        </p>
        <p className="info-pedidoCliente">
          <p>Mesa</p> <span title={mesa || "Não Informado"}>{mesa || "Não Informado"}</span>
        </p>
        <p className="info-pedidoCliente">
          <p>Pagamento</p> <span title={pagamento}>{pagamento}</span>
        </p>
      </div>
    </>
  );
}
