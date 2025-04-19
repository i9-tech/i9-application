import React from "react";
import ComandaHeader from "../ComandaHeader/ComandaHeader";
import ComandaBody from "../ComandaBody/ComandaBody";
import ComandaFooter from "../ComandaFooter/ComandaFooter";
import ComandaInfo from "../ComandaInfo/ComandaInfo";

export default function Comanda({ pedido, index }) {
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
        
          <ComandaInfo
            key={index}
            cliente={pedido.cliente}
            mesa={pedido.mesa}
            pagamento={pedido.pagamento}
            index={index}
          />
        
      </div>

      <div className="rodape-comanda">
        <ComandaFooter qtdItens={pedido.itens.length} index={index}/>
      </div>
    </div>
  );
}
