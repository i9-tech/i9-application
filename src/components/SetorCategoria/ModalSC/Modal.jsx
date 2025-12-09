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
  const _tokenUrl = enviroments.tokenURL;

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null); // File
  const [urlImagem, setUrlImagem] = useState("");
  const [modalImagensAberto, setModalImagensAberto] = useState(false);
  const [modalBuscaAberto, setModalBuscaAberto] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(""); // <- corrigido

  // 🔄 Carregar item para edição
  useEffect(() => {
    if (itemParaEditar) {
      setNome(itemParaEditar.nome || "");

      if (itemParaEditar.imagem) {
        setUrlImagem(itemParaEditar.imagem);
        setImagemSelecionada({ url: itemParaEditar.imagem });
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

  // 📌 Submeter formulário
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

    try {
      if (tipo === "setor") {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        setPorcentagemCarregamento(20);
        await sleep(200);

        const dadosSetor = { nome };
        const formData = new FormData();
        let urlImagemFinal = "";
        let imagemParaEnvio = null;

        if (imagem) {
          imagemParaEnvio = imagem; // File
        } else if (imagemSelecionada?.url) {
          urlImagemFinal = imagemSelecionada.url; // URL externa
        } else if (urlImagem && urlImagem !== imagemPadrao) {
          urlImagemFinal = itemParaEditar?.imagem || urlImagem;
        } else {
          urlImagemFinal = "";
        }

        dadosSetor.imagem = urlImagemFinal;

        const requestBlob = new Blob([JSON.stringify(dadosSetor)], {
          type: "application/json",
        });

        formData.append(
          itemParaEditar ? "setorParaAtualizar" : "setorParaCadastro",
          requestBlob,
          "request.json"
        );

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

        const headers = {
          Authorization: `Bearer ${token}`,
        };
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
      onClose();
    } catch (error) {
      console.error(`Erro ao salvar ${tipo}:`, error.response?.data || error);
      toast.error(
        `Erro ao ${itemParaEditar ? "atualizar" : "cadastrar"} ${tipo}!`
      );
    } finally {
      setIsEnviandoDados(false);
    }
  };

  // 📌 Upload do PC
  const alterarImagem = (e) => {
    const arquivoImagem = e.target.files[0];

    if (arquivoImagem) {
      const urlTemp = URL.createObjectURL(arquivoImagem);
      setUrlImagem(urlTemp);
      setImagem(arquivoImagem); // File
      setImagemSelecionada(""); // limpar seleção anterior
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

              <label>
                {tipo === "setor" ? "Nome do Setor:" : "Nome da Categoria:"}
              </label>

              <input
                type="text"
                placeholder={tipo === "setor" ? "Pastelaria" : "Doces"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              {/* ------- IMAGEM (APENAS SETOR) ------- */}
              {tipo === "setor" && (
                <>
                  <label>Imagem:</label>

                  <div className="imagem-preview-wrapper-setor">
                    <img
                      src={urlImagem || imagemPadrao}
                      alt="Preview"
                      className="imagem-preview-setor"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalImagensAberto(true)}
                    className="botao-catalogo"
                  >
                    Catálogo I9
                  </button>

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
                </>
              )}

              {/* ------- BOTÕES ------- */}
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

      {/* Modal busca imagem internet */}
      <ModalBuscaImagem
        abrir={modalBuscaAberto}
        onFechar={() => setModalBuscaAberto(false)}
        onSelecionar={(url) => {
          setUrlImagem(url);
          setImagemSelecionada({ url }); // salvar URL externa
          setImagem(null);
          setModalBuscaAberto(false);
        }}
      />

      {/* Modal catálogo INOVE */}
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
                    imagemSelecionada?.fixa === src.fixa ? "selecionada" : ""
                  }`}
                  onClick={() => {
                    setImagemSelecionada(src);
                    setUrlImagem(src.fixa);
                    setImagem(null);
                    setModalImagensAberto(false);
                  }}
                />
              ))}
            </div>

            <button
              className="btn cancelar"
              onClick={() => setModalImagensAberto(false)}
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
