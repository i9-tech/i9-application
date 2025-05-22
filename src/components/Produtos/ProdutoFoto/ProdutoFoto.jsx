import React, { useState, useEffect } from "react";
import "./ProdutoFoto.css";
import imagemPadrao from "../../../assets/arroz.png";

const ProdutoFoto = ({ imagem, descricao, setDescricao, setImagem }) => {
  const tokenURL = ""

  return (
    <div className="foto-produto">
      <div className="bloco-imagem">
        <label className="label-foto">Foto do Produto</label>
        <img
          src={imagem ? (imagem + tokenURL) : imagemPadrao}
          alt="Foto do produto"
          className="imagem-preview"
        />
         <p className="texto-upload">Faça upload da foto do produto <input type="file" onChange={(e) => setImagem(e.target.files[0])}/>
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
