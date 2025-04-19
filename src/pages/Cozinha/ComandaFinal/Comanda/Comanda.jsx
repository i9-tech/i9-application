import React from "react";
import ComandaHeader from "../ComandaHeader/ComandaHeader";
import ComandaBody from "../ComandaBody/ComandaBody";
import ComandaFooter from "../ComandaFooter/ComandaFooter";

export default function Comanda({ pedido }) {
  return (
    <div className="comanda">
      <div className="cabecalho-comanda">
        <ComandaHeader
          numeroPedido={pedido.numeroPedido}
          dataHora={pedido.dataHora}
        />
      </div>

      <div className="corpo-comanda">
        {pedido.itens.map((item, index) => (
          <ComandaBody
            key={index}
            titulo={
              <>
                <span>{item.titulo.split(" ")[0]}</span>{" "}
                {item.titulo.split(" ").slice(1).join(" ")}
              </>
            }
            descricao={item.descricao}
            observacao={item.observacao}
            index={index}
            pedidoId={pedido.numeroPedido}
          />
        ))}
      </div>

      <div className="rodape-comanda">
        <ComandaFooter />
      </div>
    </div>
  );
}
