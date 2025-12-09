import ComandaHeader from "../ComandaHeader/ComandaHeader";
import ComandaBody from "../ComandaBody/ComandaBody";
import ComandaFooter from "../ComandaFooter/ComandaFooter";
import ComandaInfo from "../ComandaInfo/ComandaInfo";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getToken } from "../../../utils/auth";
import { toast } from "react-toastify";

export default function Comanda({
  pedido,
  index,
  atualizarComandas,
  modo,
  areaSelecionada,
  pedidosConcluidos,
  setPedidosConcluidos,
}) {
  const token = getToken();

  const todasCheckboxMarcadas = pedido.itensCarrinho.every(
    (item) => pedidosConcluidos[item.id] === true
  );

  const desabilitarBotao = !todasCheckboxMarcadas || Boolean(areaSelecionada);

  const marcarOuDesmarcarCheckbox = (id) => {
    setPedidosConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      [id]: !estadoAnterior[id],
    }));
  };

  const concluirTodos = (novoValor) => {
    const novosPedidos = {};
    pedido.itensCarrinho.forEach((item) => {
      novosPedidos[item.id] = novoValor;
    });
    setPedidosConcluidos((estadoAnterior) => ({
      ...estadoAnterior,
      ...novosPedidos,
    }));
  };

  const handleCompletar = () => {
    api
      .post(`${ENDPOINTS.VENDA_FINALIZAR_PRATO}?idVenda=${pedido.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success(`Pedido ${pedido.id} concluído com sucesso!`);
        atualizarComandas(pedido.id);
      })
      .catch((err) => {
        toast.error("Erro ao concluir pedido!");
        console.log("Erro ao finalizar pedido: ", err);
      });
  };

  if (modo === "preparo" && pedido.vendaConcluida) return null;

  return (
    <div className="comanda-container">
      <div className="comanda">
        <div className="cabecalho-comanda">
          <ComandaHeader
            numeroPedido={pedido.id}
            dataHora={pedido.dataVenda}
            concluirTodos={concluirTodos}
            isCheckboxMarcadas={todasCheckboxMarcadas}
            setIsCheckboxMarcadas={concluirTodos}
          />
        </div>

        <div className="corpo-comanda">
          {pedido.itensCarrinho.map((item) => (
            <ComandaBody
              key={item.id}
              imagem={item.prato.imagem}
              titulo={
                <>
                  <span>{item.prato.nome.split(" ")[0]}</span>{" "}
                  {item.prato.nome.split(" ").slice(1).join(" ")}
                </>
              }
              descricao={item.prato.descricao}
              observacao={item.observacao}
              index={item.id}
              pedidoId={pedido.numeroPedido}
              checkboxMarcada={pedidosConcluidos[item.id]}
              aoClicarNaCheckbox={() => marcarOuDesmarcarCheckbox(item.id)}
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
            disabled={desabilitarBotao}
            feito={pedido.vendaConcluida}
          />
        </div>
      </div>
    </div>
  );
}
