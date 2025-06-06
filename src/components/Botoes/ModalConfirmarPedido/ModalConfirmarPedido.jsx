import './ModalConfirmarPedido.css';
import BotaoGenericoAtendente from '../BotaoGenericoAtendente/BotaoGenericoAtendente';
import ModalInfoComanda from '../ModalInfoComanda/ModalInfoComanda';
import { useState } from 'react';
import api from '../../../provider/api';
import { ENDPOINTS } from '../../../utils/endpoints';
import { getFuncionario, getToken } from '../../../utils/auth';
export function ModalConfirmarPedido({ onClose, statusModal }) {
  const funcionario = getFuncionario();
  const token = getToken();
  const [descricaoCliente, setDescricaoCliente] = useState('');
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('Débito');
  const [modalAbertoInfoComanda, setModalAbertoInfoComanda] = useState(false);
  
  
  const abrirModalInforComanda = () => {
    const hoje = new Date().toISOString().split("T")[0];
    
    api
      .post(
        ENDPOINTS.VENDA,
        {
          mesa: mesa,
          cliente: descricaoCliente,
          formaPagamento: formaPagamento,
          dataVenda: hoje,
          itens: [17, 18],
          funcionarioId: funcionario.userId,
          valorTotal: 0.0,
          vendaConcluida: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPedido(res.data);
        setModalAbertoInfoComanda(true);
        console.log(`Venda gerada: `, res.data);
      })
      .catch((err) => {
        console.log("Erro ao gerar venda: ", err);
      });
  }

const fecharModalInforComanda = () => {
  setModalAbertoInfoComanda(false);
  statusModal(false);
}

return (
  <div className="container-modal-confirmar-pedido">
    {modalAbertoInfoComanda && (
      <ModalInfoComanda pedido={pedido}
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
          value={descricaoCliente}
          onChange={(e) => setDescricaoCliente(e.target.value)}
        />

        <label>Mesa</label>
        <input
          type="number"
          placeholder="Número da Mesa"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />

        <label>Forma de Pagamento</label>
        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}>
          <option value="Debito">Débito</option>
          <option value="Credito">Crédito</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Pix">Pix</option>
        </select>

      </div>

      <div className="botoes-modal">
        <BotaoGenericoAtendente texto={"Confirmar Pedido"} onClick={abrirModalInforComanda}></BotaoGenericoAtendente>
      </div>
    </div>
  </div>
);
};
export default ModalConfirmarPedido;
