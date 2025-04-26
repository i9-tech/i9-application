import './ModalConfirmarPedido.css';
import BotaoGenericoAtendente from '../BotaoGenericoAtendente/BotaoGenericoAtendente';
import ModalInfoComanda from '../ModalInfoComanda/ModalInfoComanda';
import { useEffect, useState } from 'react';
export function ModalConfirmarPedido({ onClose, statusModal}) {
  const [modalAbertoInfoComanda, setModalAbertoInfoComanda] = useState(false);
  const abrirModalInforComanda = () => {
    setModalAbertoInfoComanda(true);
  }

  const fecharModalInforComanda = () => {
    setModalAbertoInfoComanda(false);
    statusModal(false);
  }

  return (
    <div className="container-modal-confirmar-pedido">
      {modalAbertoInfoComanda && (
        <ModalInfoComanda  pedido={{
          numero: 250,
          cliente: 'Jhonattan',
          mesa: 5,
          pagamento: 'Dinheiro',
          itens: [
            { nome: 'Lanche Naturakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl', quantidade: 2, total: '24,00' },
            { nome: 'Chicken Jr', quantidade: 1, total: '13,00' },
            { nome: 'Lanche Natural', quantidade: 2, total: '24,00' },
            { nome: 'Chicken Jr', quantidade: 1, total: '13,00' },
            { nome: 'Lanche Natural', quantidade: 2, total: '24,00' },
            { nome: 'Chicken Jr', quantidade: 1, total: '13,00' },
            { nome: 'Lanche Natural', quantidade: 2, total: '24,00' },
            { nome: 'Chicken Jr', quantidade: 1, total: '13,00' },
          ],
          subtotal: '37,00'
        }}
        onClose={() => fecharModalInforComanda()} />
      )}

      <div className={`modal ${statusModal && modalAbertoInfoComanda ? 'confirmar' : ''}`}>
        <button className="botao-fechar" onClick={onClose}>x</button>
        <div className="modal-header">
          <h2>Informações Sobre o Pedido</h2>
        </div>

        <div id="observacoes-container">
          <label>Nome/Descrição do Cliente</label>
          <input
            type="text"
            placeholder="Nome/Descrição do Cliente"

          />

          <label>Mesa</label>
          <input
            type="number"
            placeholder="Número da Mesa"
          />

          <label>Forma de Pagamento</label>
          <select>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        <div className="botoes-modal">
          <BotaoGenericoAtendente texto={"Confirmar Pedido"} onClick={abrirModalInforComanda}></BotaoGenericoAtendente>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmarPedido;
