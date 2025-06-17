import "./ModalObservacoes.css";
import BotaoGenericoAtendente from "../BotaoGenericoAtendente/BotaoGenericoAtendente";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function ModalObservacoes({
  produto,
  quantidade,
  onClose,
  onSalvarObservacoes,
}) {
  const [observacoes, setObservacoes] = useState([]);

  useEffect(() => {
    const novasObservacoes = Array.from({ length: quantidade }, (_, i) => {
      const textoExistente = produto.observacoes?.[i]?.texto || "";
      return { id: i + 1, texto: textoExistente };
    });
    setObservacoes(novasObservacoes);
  }, [quantidade, produto]);

  const somenteLetrasComAcento = /^[A-Za-zÀ-ÿ\s]+$/;

  const handleClickAdicionarObservacao = () => {
    const invalida = observacoes.find((obs) => {
      const texto = obs.texto.trim();
      if (texto !== "" && !somenteLetrasComAcento.test(texto)) return true;
      return false;
    });

    if (invalida) {
      toast.error(
        <p style={{ display: "flex", flexDirection: "column" }}>
          <p>
            Observação <b style={{ color: "#0F14B8" }}>"{invalida.texto}"</b>{" "}
            inválida!
          </p>
          <p>Apenas letras e espaços são permitidos.</p>
        </p>
      );
      return;
    }

    onClose();
    if (observacoes.length > 0 && typeof onSalvarObservacoes === "function") {
      onSalvarObservacoes(observacoes);
    }
  };

  const handleChange = (id, novoTexto) => {
    setObservacoes((prev) =>
      prev.map((obs) => (obs.id === id ? { ...obs, texto: novoTexto } : obs))
    );
  };

  return (
    <div className="container-observacao">
      <div className="modal">
        <button className="botao-fechar" onClick={onClose}>
          x
        </button>
        <div className="modal-header">
          <h2>Adicione Observações</h2>
        </div>

        <div id="observacoes-container">
          {observacoes.map((obs) => (
            <div key={obs.id}>
              <label>
                {produto.nome} #{obs.id}
              </label>
              <input
                type="text"
                placeholder="Observação"
                value={obs.texto}
                onChange={(e) => handleChange(obs.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="botoes-modal">
          <BotaoGenericoAtendente
            texto={"Adicionar Observação"}
            onClick={handleClickAdicionarObservacao}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalObservacoes;
