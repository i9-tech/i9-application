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
  itemCarrinhoIds,
  onConfirmarPedido,
  onLimparComandas,
}) {
  const funcionario = getFuncionario();
  const token = getToken();
  const [descricaoCliente, setDescricaoCliente] = useState("");
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Débito");
  const [modalAbertoInfoComanda, setModalAbertoInfoComanda] = useState(false);

  const abrirModalInforComanda = (e) => {
    e.preventDefault();
    const hoje = new Date()
      .toLocaleDateString("pt-BR")
      .split("/")
      .reverse()
      .join("-");

    api
      .post(
        ENDPOINTS.VENDA,
        {
          mesa: mesa || "",
          cliente: descricaoCliente || "Não informado",
          formaPagamento: formaPagamento,
          dataVenda: hoje,
          itens: itemCarrinhoIds,
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
        if (onConfirmarPedido) {
          onConfirmarPedido();
        }

        if (onLimparComandas) {
          onLimparComandas();
        }
        toast.success("Venda realizada com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao gerar venda: ", err);
        toast.error("Erro ao gerar venda!");
      });
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
        <button className="botao-fechar" onClick={onClose}>
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
            onChange={(e) => setDescricaoCliente(e.target.value)}
          />

          <label>Mesa</label>
          <input
            type="text"
            maxLength={10}
            placeholder="Número da Mesa"
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
          >
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="VR">Vale Refeição</option>
            <option value="VA">Vale Alimentação</option>
          </select>

          <div className="botoes-modal">
            <BotaoGenericoAtendente texto={"Confirmar Pedido"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalConfirmarPedido;
