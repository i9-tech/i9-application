import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, tipo = 'setor', onSalvar }) => {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert('Preencha o nome antes de continuar.');
      return;
    }

    onSalvar({ tipo, nome, imagem });
    setNome('');
    setImagem(null);
    onClose();
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagem(file);
  };

  const titulo = tipo === 'setor' ? 'Cadastro de Setor' : 'Cadastro de Categoria';
  const subtitulo = tipo === 'setor'
    ? 'Cadastre um novo setor da empresa, como cozinha, bar, etc.'
    : 'Cadastre uma nova categoria para produtos e pratos.';
  const labelNome = tipo === 'setor' ? 'Nome do Setor:' : 'Nome da Categoria:';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="modal-form" onSubmit={handleSubmit}>
          <h2>{titulo}</h2>
          <p className="modal-subtitulo">{subtitulo}</p>

          <label>{labelNome}</label>
          <input
            type="text"
            placeholder={`Digite o ${labelNome.toLowerCase()}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />

          <div className="modal-botoes">
            <button type="button" className="btn cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn cadastrar">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
