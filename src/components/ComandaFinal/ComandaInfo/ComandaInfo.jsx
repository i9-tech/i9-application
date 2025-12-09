import React from "react";

export default function ComandaInfo({ cliente, mesa, pagamento }) {
  return (
    <>
      <div className="pedidoCliente">
        <p className="info-pedidoCliente">
          <strong>Cliente</strong> <span title={cliente}>{cliente}</span>
        </p>
        <p className="info-pedidoCliente">
          <strong>Mesa</strong> <span title={mesa || "Não Informado"}>{mesa || "Não Informado"}</span>
        </p>
        <p className="info-pedidoCliente">
          <strong>Pagamento</strong> <span title={pagamento}>{pagamento}</span>
        </p>
      </div>
    </>
  );
}
