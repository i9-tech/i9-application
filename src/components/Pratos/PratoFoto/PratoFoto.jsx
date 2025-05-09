import React from "react";
import "./PratoFoto.css";
import imagemPadrao from "../../../assets/arroz.png";

const PratoFoto = ({ imagem, descricao, setDescricao }) => {
  const caminhoImagem = imagem || imagemPadrao;

  const handleDescricaoChange = (e) => {
    if (setDescricao) setDescricao(e.target.value);
  };

  return (
    <div className="foto-produto">
      <div className="bloco-imagem">
        <label className="label-foto">Foto do Prato</label>
        <img
          src={caminhoImagem}
          alt="Foto do produto"
          className="imagem-preview"
        />
        <p className="texto-upload">Faça upload da foto do produto (JPG, PNG, JPEG)</p>
      </div>

      <div className="descricao-produto-foto">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={handleDescricaoChange}
          rows="8"
        />
      </div>
    </div>
  );
};

export default PratoFoto;
