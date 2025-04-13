import './ModalObservacoes.css';
import BotaoGenericoAtendente from '../BotaoGenericoAtendente/BotaoGenericoAtendente';
import { useState, useEffect } from 'react';

export function ModalObservacoes({ produto, quantidade, onClose }) {
  const [observacoes, setObservacoes] = useState([]);

  useEffect(() => {
    const novasObservacoes = Array.from({ length: quantidade }, (_, i) => ({
      id: i + 1,
      texto: '',
    }));
    setObservacoes(novasObservacoes);
  }, [quantidade]);

  const handleChange = (id, novoTexto) => {
    setObservacoes(prev =>
      prev.map(obs =>
        obs.id === id ? { ...obs, texto: novoTexto } : obs
      )
    );
  };

  return (
    <div className="container">
  
    <div className="modal">
    <button className="botao-fechar" onClick={onClose}>x</button>
      <div className="modal-header">
        <h2>Adicione Observações</h2>
      </div>
  
      <div id="observacoes-container">
        {observacoes.map(obs => (
          <div key={obs.id}>
            <label>{produto.nome} #{obs.id}</label>
            <input
              type="text"
              placeholder="Observação"
              value={obs.texto}
              onChange={e => handleChange(obs.id, e.target.value)}
            />
          </div>
        ))}
      </div>
  
      <div className="botoes-modal">
            <BotaoGenericoAtendente texto={"Adicionar Observação"}></BotaoGenericoAtendente>
      </div>
    </div>
  </div>
  
  );
}

export default ModalObservacoes;
