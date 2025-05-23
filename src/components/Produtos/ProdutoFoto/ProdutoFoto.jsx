import React, { useState, useEffect } from "react";
import "./ProdutoFoto.css";
import imagemPadrao from "../../../assets/arroz.png";
import { enviroments } from "../../../utils/enviroments";

const ProdutoFoto = ({ imagem, descricao, setDescricao, setImagem }) => {
  const tokenImagem = enviroments.tokenURL;
  console.log("Token da imagem:", tokenImagem);
  const [previewImagem, setPreviewImagem] = useState("");

  useEffect(() => {
    if (typeof imagem === "string") {
      if (enviroments.ambiente === "jsonserver") {
        setPreviewImagem(imagem);
      } else {
        setPreviewImagem(imagem + tokenImagem);
      }
    }
  }, [imagem, tokenImagem]);

  useEffect(() => {
    return () => {
      if (previewImagem && previewImagem.startsWith("blob:")) {
        URL.revokeObjectURL(previewImagem);
      }
    };
  }, [previewImagem]);

  const alterarImagem = (e) => {
    const arquivoImagem = e.target.files[0];

    if (arquivoImagem) {
      const urlImagemTemporaria = URL.createObjectURL(arquivoImagem);
      setPreviewImagem(urlImagemTemporaria);
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
          onChange={(e) => setDescricao(e.target.value)}
          rows="8"
        />
      </div>
    </div>
  );
};

export default ProdutoFoto;
