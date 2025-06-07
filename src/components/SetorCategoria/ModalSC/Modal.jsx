import React, { useEffect, useState } from 'react';
import './Modal.css';
import api from '../../../provider/api';
import { ENDPOINTS } from '../../../utils/endpoints';
import { getFuncionario, getToken } from '../../../utils/auth';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, tipo = 'setor', onSalvar, itemParaEditar = null }) => {
  const funcionario = getFuncionario();
  const token = getToken();

  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert('Preencha o nome antes de continuar.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (tipo === 'categoria') {
      if (itemParaEditar) {
        api
          .put(`${ENDPOINTS.CATEGORIAS}/${itemParaEditar.id}/${funcionario.userId}`, { nome }, { headers })
          .then((response) => {
            toast.success("Categoria atualizada com sucesso!");
            onSalvar(response.data);
            onClose();
          })
          .catch((error) => {
            toast.error("Erro ao atualizar categoria!");
            console.error("Erro ao atualizar categoria:", error);
          });
      } else {
        api
          .post(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, corpo, { headers })
          .then((response) => {
            toast.success("Categoria cadastrada com sucesso!");
            onSalvar(response.data);
            setNome('');
            onClose();
          })
          .catch((error) => {
            toast.error("Erro ao cadastrar categoria!");
            console.error("Erro ao cadastrar categoria:", error);
          });
      }
    } else {
      if (itemParaEditar) {
        api
          .patch(`${ENDPOINTS.SETORES}/${itemParaEditar.id}/${funcionario.userId}`, { nome }, { headers })
          .then((response) => {
            toast.success("Setor atualizado com sucesso!");
            onSalvar(response.data);
            onClose();
          })
          .catch((error) => {
            toast.error("Erro ao atualizar setor!");
            console.error("Erro ao atualizar setor:", error);
          });
      } else {
        api
          .post(`${ENDPOINTS.SETORES}/${funcionario.userId}`, { nome }, { headers })
          .then((response) => {
            toast.success("Setor cadastrado com sucesso!");
            onSalvar(response.data);
            setNome('');
            onClose();
          })
          .catch((error) => {
            toast.error("Erro ao cadastrar setor!");
            console.error("Erro ao cadastrar setor:", error);
          });
      }
    }
  };


  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagem(file);
  };

  const titulo = itemParaEditar
    ? (tipo === 'setor' ? 'Editar Setor' : 'Editar Categoria')
    : (tipo === 'setor' ? 'Cadastro de Setor' : 'Cadastro de Categoria');
  const subtitulo = itemParaEditar
    ? (tipo === 'setor'
        ? 'Edite as informações do setor selecionado.'
        : 'Edite as informações da categoria selecionada.')
    : (tipo === 'setor'
        ? 'Cadastre um novo setor da empresa. Os setores facilitam a organização operacional e a gestão dos pedidos. Exemplos: Restaurante, Lanchonete, Pastelaria...'
        : 'Cadastre novas categorias para produtos e pratos. As categorias ajudam a organizar os itens nas telas de atendente e estoque, facilitando a visualização. Exemplos: Doces, Salgados, Bebidas...');
  const labelNome = tipo === 'setor' ? 'Nome do Setor:' : 'Nome da Categoria:';

  useEffect(() => {
    if (itemParaEditar) {
      setNome(itemParaEditar.nome || '');
    } else {
      setNome('');
      setImagem(null);
    }
  }, [itemParaEditar, isOpen]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="modal-form" onSubmit={handleSubmit}>
              <h2>{titulo}</h2>
              <p className="modal-subtitulo">{subtitulo}</p>

              <label>{labelNome}</label>
              <input
                type="text"
                placeholder={tipo === 'setor' ? 'Pastelaria' : 'Doces'}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              {tipo === 'setor' && (
                <>
                  <label>Imagem:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                  />
                </>
              )}

              <div className="modal-botoes">
                <button type="button" className="btn cancelar" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn cadastrar">
                  {itemParaEditar ? 'Editar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;