import React, { useEffect, useState } from "react";
import "./Modal.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario, getToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { imagens } from "./imagensFixas";
import { imagemPadrao } from "../../../assets/imagemPadrao";
import { enviroments } from "../../../utils/enviroments";

const Modal = ({
  isOpen,
  onClose,
  tipo = "setor",
  onSalvar,
  itemParaEditar = null,
  setPorcentagemCarregamento,
  setIsEnviandoDados,
}) => {
  const funcionario = getFuncionario();
  const token = getToken();
  const tokenUrl = enviroments.tokenURL;

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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEnviandoDados(true);
    setPorcentagemCarregamento(10);
    await sleep(200);

    if (!nome.trim()) {
      alert("Preencha o nome antes de continuar.");
      setIsEnviandoDados(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    try {
      if (tipo === "setor") {
        setPorcentagemCarregamento(20);
        await sleep(200);

        const dadosSetor = { nome };
        const formData = new FormData();
        let urlImagemFinal = "";
        let imagemParaEnvio = null;

        if (imagem) {
          imagemParaEnvio = imagem;
        } else if (imagemSelecionada?.url) {
          urlImagemFinal = imagemSelecionada.url;
        } else if (urlImagem && urlImagem !== imagemPadrao) {
          urlImagemFinal = itemParaEditar?.imagem || urlImagem;
        } else {
          urlImagemFinal = "";
        }

        dadosSetor.imagem = urlImagemFinal;

        const requestBlob = new Blob([JSON.stringify(dadosSetor)], {
          type: "application/json",
        });
        formData.append(itemParaEditar ? "setorParaAtualizar" : "setorParaCadastro", requestBlob, "request.json");

        if (imagemParaEnvio) {
          formData.append("imagem", imagemParaEnvio);
        }

        setPorcentagemCarregamento(60);
        await sleep(200);

        let response;
        if (itemParaEditar) {
          response = await api.patch(
            `${ENDPOINTS.SETORES}/${itemParaEditar.id}/${funcionario.userId}`,
            formData,
            { headers }
          );
          toast.success("Setor atualizado com sucesso!");
        } else {
          response = await api.post(
            `${ENDPOINTS.SETORES}/${funcionario.userId}`,
            formData,
            { headers }
          );
          toast.success("Setor cadastrado com sucesso!");
          setNome("");
        }

        setPorcentagemCarregamento(90);
        await sleep(200);
        onSalvar(response.data);
        onClose();
      } else if (tipo === "categoria") {
        const dadosCategoria = { nome };

        setPorcentagemCarregamento(60);
        await sleep(200);

        if (itemParaEditar) {
          const response = await api.put(
            `${ENDPOINTS.CATEGORIAS}/${itemParaEditar.id}/${funcionario.userId}`,
            dadosCategoria,
            { headers }
          );
          toast.success("Categoria atualizada com sucesso!");
          onSalvar(response.data);
          onClose();
        } else {
          const response = await api.post(
            `${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`,
            dadosCategoria,
            { headers }
          );
          toast.success("Categoria cadastrada com sucesso!");
          onSalvar(response.data);
          setNome("");
          onClose();
        }

        setPorcentagemCarregamento(90);
        await sleep(200);
      }

      setPorcentagemCarregamento(100);
      await sleep(200);
    } catch (error) {
      console.error(`Erro ao salvar ${tipo}:`, error.response?.data || error);
      toast.error(
        `Erro ao ${itemParaEditar ? "atualizar" : "cadastrar"} ${tipo}!`
      );
    } finally {
      setIsEnviandoDados(false);
    }
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setImagemSelecionada("");
      setUrlImagem("");
      setModalImagensAberto(false);
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
                    {imagem ? (
                      <img
                        src={URL.createObjectURL(imagem)}
                        alt="Imagem carregada localmente"
                        className="imagem-preview-setor"
                      />
                    ) : urlImagem && urlImagem !== imagemPadrao ? (
                      <img
                        src={urlImagem}
                        alt="Imagem do setor"
                        className="imagem-preview-setor"
                      />
                    ) : (
                      <img
                        src={imagemPadrao}
                        alt="Nenhuma imagem selecionada"
                        className="imagem-preview-setor"
                      />
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
                    imagemSelecionada.fixa === src.fixa ? "selecionada" : ""
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
                  Faça upload da foto do setor (JPG, PNG, JPEG)
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImagemChange}
                    className="input-escondido"
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