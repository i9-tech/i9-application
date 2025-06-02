import ComandaHeader from "../ComandaHeader/ComandaHeader";
import ComandaBody from "../ComandaBody/ComandaBody";
import ComandaFooter from "../ComandaFooter/ComandaFooter";
import ComandaInfo from "../ComandaInfo/ComandaInfo";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getToken } from "../../../utils/auth";

export default function Comanda({
  pedido,
  index,
  numeroPedido,
  atualizarComandas,
}) {
  const token = getToken();

  const handleCompletar = () => {
    if (pedido.vendaConcluida == false) {
      api
        .post(`${ENDPOINTS.VENDA_FINALIZAR_PRATO}?idVenda=${pedido.id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data == true) {
            atualizarComandas(pedido.id);
            console.log("Pedido finalizado: ", res.data);
          } else {
            console.log("Pedido já está finalizado!");
          }
        })
        .catch((err) => {
          console.log("Erro ao finalizar pedido: ", err);
        });
    }
  };

  if (pedido.vendaConcluida) return null;

  return (
    <div className="comanda-container">
      <div className="comanda">
        <div className="cabecalho-comanda">
          <ComandaHeader
            numeroPedido={numeroPedido + 1}
            dataHora={pedido.dataVenda}
          />
        </div>

        <div className="corpo-comanda">
          {pedido.itensCarrinho.map((item, index) => (
            <ComandaBody
              imagem={item.prato.imagem}
              key={index}
              titulo={
                <>
                  <span>{item.prato.nome.split(" ")[0]}</span>{" "}
                  {item.prato.nome.split(" ").slice(1).join(" ")}
                </>
              }
              descricao={item.prato.descricao}
              observacao={item.observacao}
              index={index}
              pedidoId={pedido.numeroPedido}
            />
          ))}
          <ComandaInfo
            key={index}
            cliente={pedido.cliente}
            mesa={pedido.mesa}
            pagamento={pedido.formaPagamento}
            index={index}
          />
        </div>

        <div className="rodape-comanda">
          <ComandaFooter
            qtdItens={pedido.itensCarrinho.length}
            index={index}
            onCompletar={handleCompletar}
          />
        </div>
      </div>
    </div>
  );
}
