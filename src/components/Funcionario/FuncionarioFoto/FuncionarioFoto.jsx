import React from "react";
import "./FuncionarioFoto.css";
import imagemPadrao from "../../../assets/fotofuncionario.png";

const FuncionarioFoto = ({ imagem }) => {
  const caminhoImagem = imagem ? imagem : imagemPadrao;

  return (
    <div className="foto-funcionario">
      <img
        src={caminhoImagem}
        alt="Foto do funcionário"
        className="imagem-preview"
      />
      <p>Faça upload da foto (JPG, PNG, JPEG)</p>
    </div>
  );
};

export default FuncionarioFoto;
