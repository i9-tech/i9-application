import React, { useState, useEffect } from "react";
import "./ProdutoFoto.css";
import { imagemPadrao } from "../../../assets/imagemPadrao";
import { enviroments } from "../../../utils/enviroments";

const ProdutoFoto = ({ imagem, descricao, setDescricao, setImagem }) => {
  const tokenImagem = enviroments.tokenURL;
  const [previewImagem, setPreviewImagem] = useState("");

  const [uploadFeito, setUploadFeito] = useState(false);

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
    <div className="foto-produto">
      <div className="bloco-imagem">
        <label className="label-foto">Foto do Produto</label>
        <img
          src={previewImagem || imagemPadrao}
          alt="Foto do produto"
          className="imagem-preview"
        />

        <p className="texto-upload">
          <label htmlFor="upload-input">
            Faça upload da foto do produto (JPG, PNG, JPEG)
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
          placeholder="Crystal Água Mineral Sem Gás 500ml Garrafa"

        />
      </div>
    </div>
  );
};

export default ProdutoFoto;
