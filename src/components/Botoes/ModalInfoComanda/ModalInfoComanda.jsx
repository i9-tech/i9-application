import './ModalInfoComanda.css';
import BotaoGenericoAtendente from '../BotaoGenericoAtendente/BotaoGenericoAtendente';

export function ModalInfoComanda({ pedido, onClose }) {
  if (!pedido) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Pedido #{pedido.numero}</h2>
        <div className="modal-info">
          <p><strong>Cliente</strong> <span>{pedido.cliente}</span></p>
          <p><strong>Mesa</strong> <span>{pedido.mesa}</span></p>
          <p><strong>Pagamento</strong> <span>{pedido.pagamento}</span></p>
        </div>

        <div className="modal-itens">
  {pedido.itens.map((item, index) => (
    <div className="item-linha" key={index}>
      <span className="item-nome" title={item.nome}>{index + 1}). {item.nome}</span>
      <span className="item-quantidade">{item.quantidade}</span>
      <span className="item-total">R${item.total}</span>
    </div>
  ))}
</div>

        <div className="modal-subtotal">
          <p>Subtotal</p>
          <span>R${pedido.subtotal}</span>
        </div>

        <div className="modal-botao">
          <BotaoGenericoAtendente texto="Fechar" onClick={onClose} />
        </div>
      </div>
    </div>

  );
}

export default ModalInfoComanda;
