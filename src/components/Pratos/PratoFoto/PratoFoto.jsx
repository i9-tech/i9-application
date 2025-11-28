import { useEffect, useState } from "react";
import { imagemPadrao } from "../../../assets/imagemPadrao";
import "./PratoFoto.css";
import { enviroments } from "../../../utils/enviroments";
import ModalBuscaImagem from "../../ModalBuscaImagem/ModalBuscaImagem";

const PratoFoto = ({ imagem, descricao, setDescricao, setImagem }) => {
  const tokenImagem = enviroments.tokenURL;
  const [previewImagem, setPreviewImagem] = useState("");
  const [uploadFeito, setUploadFeito] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!uploadFeito) {
      if (typeof imagem === "string" && imagem.trim() !== "") {
        if (enviroments.ambiente === "jsonserver") {
          setPreviewImagem(imagem);
        } else {
          setPreviewImagem(imagem + tokenImagem);
        }
      } else {
        setPreviewImagem("");
      }
    }
  }, [imagem, tokenImagem, uploadFeito]);

  useEffect(() => {
    let urlAnterior = previewImagem;
    return () => {
      if (urlAnterior && urlAnterior.startsWith("blob:")) {
        URL.revokeObjectURL(urlAnterior);
      }
    };
  }, [previewImagem]);

  const alterarImagem = (e) => {
    const arquivoImagem = e.target.files[0];
    if (arquivoImagem) {
      const urlImagemTemporaria = URL.createObjectURL(arquivoImagem);
      setPreviewImagem(urlImagemTemporaria);
      setUploadFeito(true);
      setImagem(arquivoImagem);
    }
  };

  return (
    <>
      <div className="foto-produto">
        <div className="bloco-imagem">
          <label className="label-foto">Foto do Prato</label>
          <img
            src={previewImagem || imagemPadrao}
            alt="Foto do prato"
            className="imagem-preview"
          />
          <p className="texto-upload">
            <span
              onClick={() => setModalAberto(true)}
              style={{ cursor: "pointer", color: "var(--titulos-botoes-destaques)", textDecoration: "underline",  fontWeight: 500 }}
            >
              Escolher imagem da internet
            </span>

            <span className="ou-texto"> ou </span>

            <label htmlFor="upload-input" style={{ cursor: "pointer",  fontWeight: 500}}>
              Upload do computador
            </label>
            <input
              id="upload-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={alterarImagem}
              className="input-escondido"
            />
          </p>
        </div>

        <div className="descricao-produto-foto">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            maxLength={255}
            onChange={(e) => setDescricao(e.target.value)}
            rows="8"
            placeholder="Prato feito tradicional com contra-filé, servido com acompanhamentos caseiros como arroz branco e feijão."
          />
        </div>
      </div>

      <ModalBuscaImagem
        abrir={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSelecionar={(url) => {
          setPreviewImagem(url);
          setUploadFeito(true);
          setImagem(url);
        }}
      />
    </>
  );
};

export default PratoFoto;
