import "./ModalConfirmarPedido.css";
import BotaoGenericoAtendente from "../BotaoGenericoAtendente/BotaoGenericoAtendente";
import ModalInfoComanda from "../ModalInfoComanda/ModalInfoComanda";
import { useState } from "react";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario, getToken } from "../../../utils/auth";
import { toast } from "react-toastify";

export function ModalConfirmarPedido({
  onClose,
  statusModal,
  onConfirmarPedido,
  onLimparComandas,
  isEnviandoPedido,
  setIsEnviandoPedido,
  enviarItensCarrinho,
}) {
  const funcionario = getFuncionario();
  const token = getToken();
  const [descricaoCliente, setDescricaoCliente] = useState("");
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Débito");
  const [modalAbertoInfoComanda, setModalAbertoInfoComanda] = useState(false);

  const abrirModalInforComanda = async (e) => {
    e.preventDefault();
    setIsEnviandoPedido(true);

    const hoje = new Date()
      .toLocaleDateString("pt-BR")
      .split("/")
      .reverse()
      .join("-");

    const toastId = toast.loading("Enviando pedido...");

    try {
      const idsValidos = await enviarItensCarrinho();

      const vendaBody = {
        mesa: mesa || "",
        cliente: descricaoCliente || "Não informado",
        formaPagamento: formaPagamento,
        dataVenda: hoje,
        itens: idsValidos,
        funcionarioId: funcionario.userId,
        valorTotal: 0.0,
        vendaConcluida: false,
      };

      const res = await api.post(ENDPOINTS.VENDA, vendaBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPedido(res.data);
      setModalAbertoInfoComanda(true);

      if (onConfirmarPedido) onConfirmarPedido();
      if (onLimparComandas) onLimparComandas();

      toast.success("Venda realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
      toast.error("Erro ao finalizar a venda!");
    } finally {
      toast.dismiss(toastId);
      setIsEnviandoPedido(false);
    }
  };

  const fecharModalInforComanda = () => {
    setModalAbertoInfoComanda(false);
    statusModal(false);
  };

  return (
    <div className="container-modal-confirmar-pedido">
      {modalAbertoInfoComanda && (
        <ModalInfoComanda
          pedido={pedido}
          onClose={() => fecharModalInforComanda()}
        />
      )}

      <div
        className={`modal ${
          statusModal && modalAbertoInfoComanda ? "confirmar" : ""
        }`}
      >
        <button
          className="botao-fechar"
          onClick={onClose}
          disabled={isEnviandoPedido}
        >
          x
        </button>
        <div className="modal-header">
          <h2>Informações Sobre o Pedido</h2>
        </div>

        <form id="observacoes-container" onSubmit={abrirModalInforComanda}>
          <label>Nome/Descrição do Cliente</label>
          <input
            type="text"
            placeholder="Nome/Descrição do Cliente"
            maxLength={40}
            value={descricaoCliente}
            disabled={isEnviandoPedido}
            onChange={(e) => setDescricaoCliente(e.target.value)}
          />

          <label>Mesa</label>
          <input
            type="text"
            maxLength={10}
            placeholder="Número da Mesa"
            disabled={isEnviandoPedido}
            value={mesa}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 10) {
                setMesa(val);
              }
            }}
          />

          <label>
            Forma de Pagamento <span style={{ color: "red" }}>*</span>
          </label>
          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            required
            disabled={isEnviandoPedido}
          >
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="VR">Vale Refeição</option>
            <option value="VA">Vale Alimentação</option>
          </select>

          <div className="botoes-modal">
            <BotaoGenericoAtendente
              texto={"Confirmar Pedido"}
              type="submit"
              disabled={isEnviandoPedido}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalConfirmarPedido;
