import "./ModalInfoComanda.css";
import BotaoGenericoAtendente from "../BotaoGenericoAtendente/BotaoGenericoAtendente";
import { agruparPorItemRepetido, formatarMoeda } from "../../../utils/utils";

export function ModalInfoComanda({ pedido, onClose }) {
  if (!pedido) return null;
  const itensAgrupados = agruparPorItemRepetido(pedido.itensCarrinho)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Pedido #{pedido.id}</h2>
        <div className="modal-info">
          <p>
            <strong>Cliente</strong> <span>{pedido.cliente}</span>
          </p>
          <p>
            <strong>Mesa</strong> <span>{pedido.mesa}</span>
          </p>
          <p>
            <strong>Pagamento</strong> <span>{pedido.formaPagamento}</span>
          </p>
        </div>

        <div className="modal-itens">
          {itensAgrupados.map((item, index) => (
            <div className="item-linha" key={index}>
              {item?.produto && (
                <>
                  <span className="item-nome" title={item.produto.nome}>
                    {index + 1}. {item.produto.nome}
                  </span>
                  <span className="item-quantidade">{item.quantidade}x</span>
                  <span className="item-total">{formatarMoeda(Number(item.produto.valorUnitario))}</span>
                </>
              )}
              {item?.prato && (
                <>
                  <span className="item-nome" title={item.prato.nome}>
                    {index + 1}. {item.prato.nome}
                  </span>
                  <span className="item-quantidade">{item.quantidade}x</span>
                  <span className="item-total">{formatarMoeda(Number(item.prato.valorVenda))}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="modal-subtotal">
          <p>Subtotal</p>
          <span>{formatarMoeda(Number(pedido.valorTotal))}</span>
        </div>

        <div className="modal-botao">
          <BotaoGenericoAtendente texto="Fechar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default ModalInfoComanda;
