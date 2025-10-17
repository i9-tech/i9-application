import React, { useEffect, useState } from "react";
import "./Modal.css";
import api from "../../../provider/api";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario, getToken } from "../../../utils/auth";
import { toast } from "react-toastify";
import { imagens } from "./imagensFixas";
import { imagemPadrao } from "../../../assets/imagemPadrao";
import { enviroments } from "../../../utils/enviroments";
import ModalBuscaImagem from "../../ModalBuscaImagem/ModalBuscaImagem";

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

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null); // pode ser File ou string (URL)
  const [urlImagem, setUrlImagem] = useState("");
  const [modalImagensAberto, setModalImagensAberto] = useState(false);
  const [modalBuscaAberto, setModalBuscaAberto] = useState(false);

  // 🔄 Quando abre o modal, atualiza campos com dados do item
  useEffect(() => {
    if (itemParaEditar) {
      setNome(itemParaEditar.nome || "");
      setUrlImagem(itemParaEditar.imagem || imagemPadrao);
      setImagem(itemParaEditar.imagem || null);
    } else {
      setNome("");
      setImagem(null);
      setUrlImagem(imagemPadrao);
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

    const headers = { Authorization: `Bearer ${token}` };
    let imagemUrlFinal = "";

    try {
      if (imagem instanceof File) {
        const formData = new FormData();
        formData.append("file", imagem);
        const res = await api.post(ENDPOINTS.AZURE_IMAGEM, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
        imagemUrlFinal = res.data.imageUrl;
      }
      else if (typeof imagem === "string" && imagem.startsWith("http")) {
        imagemUrlFinal = imagem;
      }
      else {
        imagemUrlFinal = urlImagem === imagemPadrao ? "" : urlImagem;
      }

      const dados = { nome, imagem: imagemUrlFinal };

      const endpoint =
        tipo === "categoria"
          ? itemParaEditar
            ? `${ENDPOINTS.CATEGORIAS}/${itemParaEditar.id}/${funcionario.userId}`
            : `${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`
          : itemParaEditar
          ? `${ENDPOINTS.SETORES}/${itemParaEditar.id}/${funcionario.userId}`
          : `${ENDPOINTS.SETORES}/${funcionario.userId}`;

      const method =
        tipo === "categoria"
          ? itemParaEditar
            ? api.put
            : api.post
          : itemParaEditar
          ? api.patch
          : api.post;

      const response = await method(endpoint, dados, { headers });

      toast.success(
        itemParaEditar
          ? `${tipo === "setor" ? "Setor" : "Categoria"} atualizada com sucesso!`
          : `${tipo === "setor" ? "Setor" : "Categoria"} cadastrada com sucesso!`
      );

      onSalvar(response.data);
      setPorcentagemCarregamento(100);
      await sleep(200);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setIsEnviandoDados(false);
    }
  };

  const alterarImagem = (e) => {
    const arquivoImagem = e.target.files[0];
    if (arquivoImagem) {
      const urlTemp = URL.createObjectURL(arquivoImagem);
      setUrlImagem(urlTemp);
      setImagem(arquivoImagem);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="modal-form" onSubmit={handleSubmit}>
              <h2>
                {itemParaEditar
                  ? tipo === "setor"
                    ? "Editar Setor"
                    : "Editar Categoria"
                  : tipo === "setor"
                  ? "Cadastro de Setor"
                  : "Cadastro de Categoria"}
              </h2>

              <label>{tipo === "setor" ? "Nome do Setor:" : "Nome da Categoria:"}</label>
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
                    <img
                      src={urlImagem || imagemPadrao}
                      alt="Imagem do setor"
                      className="imagem-preview-setor"
                      onError={(e) => (e.target.src = imagemPadrao)}
                    />
                  </div>

                  <p className="texto-upload">
                    <button
                      type="button"
                      className="botao-buscar-web"
                      onClick={() => setModalBuscaAberto(true)}
                    >
                      Escolher imagem da internet
                    </button>
                    <span className="ou-texto"> ou </span>
                    <label htmlFor="upload-setor">Upload do computador</label>
                    <input
                      id="upload-setor"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={alterarImagem}
                      className="input-escondido"
                    />
                  </p>

                  <button
                    type="button"
                    onClick={() => setModalImagensAberto(true)}
                    className="btn escolher-imagem"
                  >
                    Escolher imagem do catálogo INOVE
                  </button>
                </>
              )}

              <div className="modal-botoes">
                <button type="button" className="btn cancelar" onClick={onClose}>
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

      <ModalBuscaImagem
        abrir={modalBuscaAberto}
        onFechar={() => setModalBuscaAberto(false)}
        onSelecionar={(url) => {
          setUrlImagem(url);
          setImagem(url);
          setModalBuscaAberto(false);
        }}
      />

      {modalImagensAberto && (
        <div className="modal-overlay-fotos" onClick={() => setModalImagensAberto(false)}>
          <div className="modal-content-fotos" onClick={(e) => e.stopPropagation()}>
            <h3>Escolha uma imagem que represente o setor</h3>
            <div className="galeria-imagens">
              {imagens.map((src, index) => (
                <img
                  key={index}
                  src={src.fixa}
                  alt={`Imagem ${index + 1}`}
                  className="imagem-opcao"
                  onClick={() => {
                    setUrlImagem(src.fixa);
                    setImagem(src.fixa);
                    setModalImagensAberto(false);
                  }}
                />
              ))}
            </div>
            <button className="btn cancelar" onClick={() => setModalImagensAberto(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
