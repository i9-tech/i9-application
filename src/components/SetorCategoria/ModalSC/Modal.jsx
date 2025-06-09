import React, { useEffect, useState } from "react";
import "./Modal.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario, getToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { imagens, imagensFixas } from "./imagensFixas";
import { imagemPadrao } from "../../../assets/imagemPadrao";

const Modal = ({
  isOpen,
  onClose,
  tipo = "setor",
  onSalvar,
  itemParaEditar = null,
}) => {
  const funcionario = getFuncionario();
  const token = getToken();

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);
  const [urlImagem, setUrlImagem] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [modalImagensAberto, setModalImagensAberto] = useState(false);

  useEffect(() => {
    if (itemParaEditar) {
      setNome(itemParaEditar.nome || "");
      if (itemParaEditar.imagem) {
        setUrlImagem(itemParaEditar.imagem);
        setImagemSelecionada(itemParaEditar.imagem);
      } else {
        setUrlImagem(imagemPadrao);
        setImagemSelecionada("");
      }
      setImagem(null);
    } else {
      setNome("");
      setImagem(null);
      setUrlImagem(imagemPadrao);
      setImagemSelecionada("");
    }
  }, [itemParaEditar, isOpen]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nome.trim()) {
    alert("Preencha o nome antes de continuar.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let imagemUrlFinal = "";

  try {
    // CASO 1: Upload personalizado
    if (imagem) {
      const formData = new FormData();
      formData.append("file", imagem);

      const res = await api.post(ENDPOINTS.AZURE_IMAGEM, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      imagemUrlFinal = res.data.imageUrl;
    }

    else if (imagemSelecionada?.url) {
      imagemUrlFinal = imagemSelecionada.url;
    }

    else {
      imagemUrlFinal = urlImagem || imagemPadrao;
    }

    const dados = {
      nome,
      imagem: imagemUrlFinal,
    };

    if (tipo === "categoria") {
      if (itemParaEditar) {
        const response = await api.put(
          `${ENDPOINTS.CATEGORIAS}/${itemParaEditar.id}/${funcionario.userId}`,
          { nome },
          { headers }
        );
        toast.success("Categoria atualizada com sucesso!");
        onSalvar(response.data);
        onClose();
      } else {
        const response = await api.post(
          `${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`,
          { nome },
          { headers }
        );
        toast.success("Categoria cadastrada com sucesso!");
        onSalvar(response.data);
        setNome("");
        onClose();
      }
    } else {
      if (itemParaEditar) {
        const response = await api.patch(
          `${ENDPOINTS.SETORES}/${itemParaEditar.id}/${funcionario.userId}`,
          dados,
          { headers }
        );
        toast.success("Setor atualizado com sucesso!");
        onSalvar(response.data);
        onClose();
      } else {
        const response = await api.post(
          `${ENDPOINTS.SETORES}/${funcionario.userId}`,
          dados,
          { headers }
        );
        toast.success("Setor cadastrado com sucesso!");
        onSalvar(response.data);
        setNome("");
        onClose();
      }
    }
  } catch (error) {
    toast.error(`Erro ao ${itemParaEditar ? "atualizar" : "cadastrar"} ${tipo}!`);
    console.error(`Erro ao salvar ${tipo}:`, error);
  }
};


  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setImagemSelecionada("");
      setUrlImagem("");
    }
  };

  const titulo = itemParaEditar
    ? tipo === "setor"
      ? "Editar Setor"
      : "Editar Categoria"
    : tipo === "setor"
    ? "Cadastro de Setor"
    : "Cadastro de Categoria";

  const subtitulo = itemParaEditar
    ? tipo === "setor"
      ? "Edite as informações do setor selecionado."
      : "Edite as informações da categoria selecionada."
    : tipo === "setor"
    ? "Cadastre um novo setor da empresa. Os setores facilitam a organização operacional e a gestão dos pedidos. Exemplos: Restaurante, Lanchonete, Pastelaria..."
    : "Cadastre novas categorias para produtos e pratos. As categorias ajudam a organizar os itens nas telas de atendente e estoque, facilitando a visualização. Exemplos: Doces, Salgados, Bebidas...";

  const labelNome = tipo === "setor" ? "Nome do Setor:" : "Nome da Categoria:";

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
                placeholder={tipo === "setor" ? "Pastelaria" : "Doces"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              {tipo === "setor" && (
                <>
                  <label>Imagem:</label>
                  <div className="imagem-preview-wrapper-setor">
                    {imagemSelecionada ? (
                      <img
                        src={imagemSelecionada.fixa}
                        alt="Imagem selecionada"
                        className="imagem-preview-setor"
                      />
                    ) : urlImagem ? (
                      <img
                        src={urlImagem}
                        alt="Imagem carregada"
                        className="imagem-preview-setor"
                      />
                    ) : imagem ? (
                      <img
                        src={URL.createObjectURL(imagem)}
                        alt="Imagem carregada"
                        className="imagem-preview-setor"
                      />
                    ) : (
                      <p>Nenhuma imagem selecionada</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalImagensAberto(true)}
                    className="btn escolher-imagem"
                  >
                    Escolher Imagem do Setor
                  </button>
                </>
              )}

              <div className="modal-botoes">
                <button
                  type="button"
                  className="btn cancelar"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn cadastrar">
                  {itemParaEditar ? "Editar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalImagensAberto && (
        <div
          className="modal-overlay-fotos"
          onClick={() => setModalImagensAberto(false)}
        >
          <div
            className="modal-content-fotos"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Escolha uma imagem que represente o setor</h3>
            <div className="galeria-imagens">
              {imagens.map((src, index) => (
                <img
                  key={index}
                  src={src.fixa}
                  alt={`Imagem ${index + 1}`}
                  className={`imagem-opcao ${
                    imagemSelecionada === src.fixa ? "selecionada" : ""
                  }`}
                  onClick={() => {
                    setImagemSelecionada(src);
                    setImagem(null);
                    setUrlImagem(src.url);
                    setModalImagensAberto(false);
                  }}
                />
              ))}
              <div className="upload-imagem-customizada">
                <label className="btn">
                  Upload Imagem Personalizada
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={() => setModalImagensAberto(false)}
              className="btn cancelar"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
