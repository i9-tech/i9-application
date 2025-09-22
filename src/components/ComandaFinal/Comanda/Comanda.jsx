import ComandaHeader from "../ComandaHeader/ComandaHeader";
import ComandaBody from "../ComandaBody/ComandaBody";
import ComandaFooter from "../ComandaFooter/ComandaFooter";
import ComandaInfo from "../ComandaInfo/ComandaInfo";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getToken } from "../../../utils/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Comanda({ pedido, index, atualizarComandas, modo }) {
  const token = getToken();
  const [pedidosConcluidos, setPedidosConcluidos] = useState({});
  const todasCheckboxMarcadas = Object.values(pedidosConcluidos).every(
    (valor) => valor === true
  );
  const [isCheckboxMarcadas, setIsCheckboxMarcadas] = useState(false);

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
    setPedidosConcluidos(novosPedidos);
  };

  useEffect(() => {
    const inicial = {};
    pedido.itensCarrinho.forEach((item) => {
      inicial[item.id] = pedido.vendaConcluida ? true : false;
    });
    setPedidosConcluidos(inicial);
    setIsCheckboxMarcadas(pedido.vendaConcluida);
  }, [pedido.itensCarrinho, pedido.vendaConcluida]);


  const handleCompletar = () => {
    api
      .post(`${ENDPOINTS.VENDA_FINALIZAR_PRATO}?idVenda=${pedido.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(`Pedido ${pedido.id} concluido com sucesso!`);
        atualizarComandas(pedido.id);
        console.log("Pedido finalizado: ", res.data);
      })
      .catch((err) => {
        toast.error("Erro ao conclur pedido!");
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
            isCheckboxMarcadas={isCheckboxMarcadas}
            setIsCheckboxMarcadas={setIsCheckboxMarcadas}
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
            disabled={!todasCheckboxMarcadas}
            feito={pedido.vendaConcluida}
          />
        </div>
      </div>
    </div>
  );
}
